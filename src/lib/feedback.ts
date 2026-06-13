import type { APIContext } from 'astro';
import { sql } from '@/lib/neon';

export const RATE_LIMIT = 5;
export const RATE_LIMIT_WINDOW = 60 * 1000;

export const ALLOWED_ORIGINS = [
  'https://mimukit.com',
  'http://localhost:3000',
  'https://www.mimukit.com',
];

// SECURITY ISSUE: In-memory rate limiting doesn't work in serverless environments
// where functions can be running on different instances.
// Replace with a persistent store (KV/Durable Object/Neon counter) if abuse is observed.
const rateLimitStore: Map<string, { count: number; resetTime: number }> = new Map();

export function checkRateLimit(fingerprintId: string): {
  allowed: boolean;
  error?: string;
} {
  const now = Date.now();
  const key = `rate:${fingerprintId}`;
  const entry = rateLimitStore.get(key);

  if (!entry || now > entry.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true };
  }

  if (entry.count >= RATE_LIMIT) {
    return { allowed: false, error: 'Rate limit exceeded. Try again later.' };
  }

  rateLimitStore.set(key, { count: entry.count + 1, resetTime: entry.resetTime });
  return { allowed: true };
}

export function isAllowedOrigin(origin: string | null | undefined): boolean {
  return typeof origin === 'string' && ALLOWED_ORIGINS.includes(origin);
}

export function isValidPostId(postId: unknown): postId is string {
  return typeof postId === 'string' && /^[a-zA-Z0-9-]+$/.test(postId);
}

export function isValidFingerprintId(
  fingerprintId: unknown,
): fingerprintId is string {
  return (
    typeof fingerprintId === 'string' &&
    fingerprintId.length > 0 &&
    fingerprintId.length <= 100
  );
}

export function json(
  body: { success: boolean; data: unknown; error: string | null },
  status: number,
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

type VoteConfig = {
  votesTable: 'post_likes' | 'post_dislikes';
  column: 'likes' | 'dislikes';
  alreadyVotedMessage: string;
};

export async function handleVote(
  { params, request }: APIContext,
  config: VoteConfig,
): Promise<Response> {
  const { postId } = params;

  // SECURITY CHECK: Validate origin to prevent CSRF attacks.
  const origin = request.headers.get('origin');
  if (!isAllowedOrigin(origin)) {
    return json({ success: false, data: null, error: 'Unauthorized' }, 403);
  }

  let fingerprintId: string | undefined;

  try {
    const body = await request.json();
    fingerprintId = body.fingerprintId;

    if (!isValidPostId(postId)) {
      return json({ success: false, data: null, error: 'Invalid post ID' }, 400);
    }

    if (!isValidFingerprintId(fingerprintId)) {
      return json(
        { success: false, data: null, error: 'Invalid fingerprint ID' },
        400,
      );
    }
  } catch (error) {
    console.error('Error parsing request body:', error);
    return json(
      { success: false, data: null, error: 'Invalid JSON payload' },
      400,
    );
  }

  const rateLimitResult = checkRateLimit(fingerprintId);
  if (!rateLimitResult.allowed) {
    return json(
      { success: false, data: null, error: rateLimitResult.error ?? null },
      429,
    );
  }

  try {
    const existing =
      config.votesTable === 'post_likes'
        ? await sql`
            SELECT 1 FROM post_likes
            WHERE post_id = ${postId} AND fingerprint_id = ${fingerprintId}
          `
        : await sql`
            SELECT 1 FROM post_dislikes
            WHERE post_id = ${postId} AND fingerprint_id = ${fingerprintId}
          `;

    if (existing.length > 0) {
      return json(
        { success: false, data: null, error: config.alreadyVotedMessage },
        403,
      );
    }

    try {
      if (config.votesTable === 'post_likes') {
        await sql`
          INSERT INTO post_likes (post_id, fingerprint_id)
          VALUES (${postId}, ${fingerprintId})
        `;
      } else {
        await sql`
          INSERT INTO post_dislikes (post_id, fingerprint_id)
          VALUES (${postId}, ${fingerprintId})
        `;
      }
    } catch (error) {
      if ((error as { code?: string }).code === '23505') {
        return json(
          { success: false, data: null, error: config.alreadyVotedMessage },
          403,
        );
      }
      throw error;
    }

    const result =
      config.column === 'likes'
        ? await sql`
            INSERT INTO post_feedback (post_id, likes, dislikes)
            VALUES (${postId}, 1, 0)
            ON CONFLICT (post_id)
            DO UPDATE SET likes = post_feedback.likes + 1
            RETURNING likes, dislikes
          `
        : await sql`
            INSERT INTO post_feedback (post_id, likes, dislikes)
            VALUES (${postId}, 0, 1)
            ON CONFLICT (post_id)
            DO UPDATE SET dislikes = post_feedback.dislikes + 1
            RETURNING likes, dislikes
          `;

    return json(
      {
        success: true,
        data: { likes: result[0].likes, dislikes: result[0].dislikes },
        error: null,
      },
      200,
    );
  } catch (error) {
    console.error(`Error updating ${config.column} for post ${postId}:`, error);
    return json(
      {
        success: false,
        data: null,
        error: 'An error occurred processing your request',
      },
      500,
    );
  }
}
