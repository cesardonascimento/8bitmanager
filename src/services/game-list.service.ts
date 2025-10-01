import { GameList } from '@/db/repositories/game-list.repository';
import { Platform } from '@/db/repositories/platform.repository';
import { GameListContentItem } from '@/db/schema';

export const scanGameListContent = async (
  platform: Platform,
  gameList: GameList
): Promise<Record<string, GameListContentItem>> => {
  const releasedGamesHash = platform.games.reduce(
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
        acc[key] = value;
      }

      return acc;
    },
    {} as Record<string, GameListContentItem>
  );

  return scannedGameList;
};
