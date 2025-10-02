import {
  GameList,
  GameListRepository,
} from '@/db/repositories/game-list.repository';
import { Game, GameRepository } from '@/db/repositories/game.repository';
import { GameListContentItem } from '@/db/schema';

export const scanGameListContent = async (
  games: Game[],
  gameList: GameList
): Promise<Record<string, GameListContentItem>> => {
  const releasedGamesHash = games.reduce(
    (acc, item) => {
      acc[item.titleNormalized] = {
        id: item.id,
        title: item.title,
      };

      return acc;
    },
    {} as Record<string, { id: string; title: string }>
  );

  const scannedGameList = Object.entries(gameList.content).reduce(
    (acc, [key, value]) => {
      const releasedGame = releasedGamesHash[value.titleNormalized];

      if (releasedGame) {
        acc[key] = { ...value, releasedGameId: releasedGame.id };
      } else {
        acc[key] = { ...value, releasedGameId: '' };

        const candidates = games.filter(game =>
          game.titleNormalized.includes(value.titleNormalized.slice(0, 8))
        );

        acc[key] = {
          ...value,
          releasedGameCandidates: candidates.map(game => game.id),
        };
      }

      return acc;
    },
    {} as Record<string, GameListContentItem>
  );

  return scannedGameList;
};

export const selectCandidate = async (
  gameList: GameList,
  contentItemId: string,
  releasedGameId: string
) => {
  console.log('selectCandidate', gameList.id, contentItemId, releasedGameId);
  const game = await GameRepository.fetch(releasedGameId);

  if (!game) {
    return null;
  }

  const contentItem = gameList.content[contentItemId];

  if (!contentItem) {
    return null;
  }

  const updatedContent = {
    ...gameList.content,
    [contentItemId]: {
      ...contentItem,
      releasedGameId: game.id,
    },
  };

  const updatedGameList = await GameListRepository.update(gameList.id, {
    content: updatedContent,
  });

  await GameRepository.update(game.id, {
    inCollection: true,
  });

  return updatedGameList;
};
