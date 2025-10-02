import { GameListRepository } from '@/db/repositories/game-list.repository';
import { GameRepository } from '@/db/repositories/game.repository';
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

    const updatedGameList = await selectCandidate(
      gameList,
      contentItemId,
      releasedGameId
    );

    return respondSuccess(updatedGameList);
  } catch (error) {
    return respondError(error);
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string; contentItemId: string }> }
) {
  const { id, contentItemId } = await params;

  const gameList = await GameListRepository.fetch(id);

  if (!gameList) {
    return respondNotFound();
  }

  const contentItem = gameList.content[contentItemId];

  if (!contentItem) {
    return respondNotFound();
  }

  await GameRepository.update(contentItem.releasedGameId as string, {
    inCollection: false,
  });

  const updatedContent = {
    ...gameList.content,
    [contentItemId]: { ...contentItem, releasedGameId: '' },
  };

  const updatedGameList = await GameListRepository.update(gameList.id, {
    content: updatedContent,
  });

  return respondSuccess(updatedGameList);
}
