import {
  GameListInsert,
  GameListRepository,
} from '@/db/repositories/game-list.repository';
import { GameRepository } from '@/db/repositories/game.repository';
import {
  respondBadRequest,
  respondError,
  respondNotFound,
  respondSuccess,
} from '@/lib/api/server';
import { scanGameListContent as scanGameListContent } from '@/services/game-list.service';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const platformId = searchParams.get('platformId');

  if (!platformId) {
    return respondBadRequest('Platform ID is required');
  }

  try {
    const gameLists = await GameListRepository.list(platformId);

    if (!gameLists) {
      return respondNotFound();
    }

    return respondSuccess(gameLists);
  } catch (error) {
    return respondError(error);
  }
}

export async function POST(request: Request) {
  try {
    const gameList = await request.json();
    const games = await GameRepository.list(gameList.platformId);

    if (!games) {
      return respondNotFound('Platform not found');
    }

    const scannedContent = await scanGameListContent(games, gameList);

    const createdGameList = await GameListRepository.create({
      ...gameList,
      content: scannedContent,
    } as GameListInsert);

    await GameRepository.updateMany(
      Object.values(scannedContent)
        .filter(game => game.releasedGameId)
        .map(game => ({
          id: game.releasedGameId,
          inCollection: true,
        }))
    );

    return respondSuccess(createdGameList);
  } catch (error) {
    return respondError(error);
  }
}
