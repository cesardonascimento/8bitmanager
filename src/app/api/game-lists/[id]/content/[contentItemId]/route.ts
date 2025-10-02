import { GameListRepository } from '@/db/repositories/game-list.repository';
import {
  respondBadRequest,
  respondError,
  respondNotFound,
  respondSuccess,
} from '@/lib/api/server';
import { selectCandidate } from '@/services/game-list.service';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string; contentItemId: string }> }
) {
  try {
    const { id, contentItemId } = await params;
    const { releasedGameId } = await request.json();

    if (!releasedGameId) {
      return respondBadRequest('Released game ID is required');
    }

    const gameList = await GameListRepository.fetch(id);

    if (!gameList) {
      return respondNotFound();
    }

    const updatedContent = await selectCandidate(
      gameList,
      contentItemId,
      releasedGameId
    );

    return respondSuccess(updatedContent);
  } catch (error) {
    return respondError(error);
  }
}
