import { GameRepository } from '@/db/repositories/game.repository';
import {
  respondBadRequest,
  respondError,
  respondSuccess,
} from '@/lib/api/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const platformId = searchParams.get('platformId');

  if (!platformId) {
    return respondBadRequest('Platform ID is required');
  }

  try {
    const games = await GameRepository.list(platformId);
    return respondSuccess(games);
  } catch (error) {
    return respondError(error);
  }
}

export async function POST(request: Request) {
  const games = await request.json();
  const createdGames = await GameRepository.createMany(games);
  return respondSuccess(createdGames);
}
