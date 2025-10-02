import { GameListRepository } from '@/db/repositories/game-list.repository';
import {
  respondError,
  respondNotFound,
  respondSuccess,
} from '@/lib/api/server';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const gameList = await GameListRepository.fetch(id);

    if (!gameList) {
      return respondNotFound();
    }

    return respondSuccess(gameList);
  } catch (error) {
    return respondError(error);
  }
}
