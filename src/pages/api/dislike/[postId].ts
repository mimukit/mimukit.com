import type { APIRoute } from 'astro';
import { handleVote } from '@/lib/feedback';

export const prerender = false;

export const POST: APIRoute = (context) =>
  handleVote(context, {
    votesTable: 'post_dislikes',
    column: 'dislikes',
    alreadyVotedMessage: 'You have already disliked this post',
  });
