import type { APIRoute } from 'astro';
import { sql } from '@/lib/neon';
import { handleVote, json } from '@/lib/feedback';

export const prerender = false;

export const POST: APIRoute = (context) =>
  handleVote(context, {
    votesTable: 'post_likes',
    column: 'likes',
    alreadyVotedMessage: 'You have already liked this post',
  });

export const GET: APIRoute = async ({ params }) => {
  const { postId } = params;

  // Add input validation for the postId
  if (!postId || !/^[a-zA-Z0-9-]+$/.test(postId)) {
    return json({ success: false, data: null, error: 'Invalid post ID' }, 400);
  }

  try {
    const result = await sql`
      SELECT likes, dislikes FROM post_feedback
      WHERE post_id = ${postId}
    `;

    if (result.length === 0) {
      return json(
        { success: true, data: { likes: 0, dislikes: 0 }, error: null },
        200,
      );
    }

    return json(
      {
        success: true,
        data: { likes: result[0].likes, dislikes: result[0].dislikes },
        error: null,
      },
      200,
    );
  } catch (error) {
    console.error(`Error fetching likes/dislikes for post ${postId}:`, error);
    return json(
      { success: false, data: null, error: 'An error occurred fetching post data' },
      500,
    );
  }
};
