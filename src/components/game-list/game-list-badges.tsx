import { Badge } from '@/components/ui/badge';
import { GameList } from '@/db/repositories/game-list.repository';

interface GameListBadgesProps {
  gameList: GameList;
}

export function GameListBadges({ gameList }: GameListBadgesProps) {
  const missingGames = gameList.gamesCount - gameList.foundGamesCount;

  return (
    <div className="flex flex-wrap gap-2">
      <Badge variant="secondary">{gameList.gamesCount} Games</Badge>
      <Badge variant="secondary">{gameList.foundGamesCount} Found</Badge>
      <Badge variant={missingGames > 0 ? 'destructive' : 'secondary'}>
        {missingGames} Missing
      </Badge>
    </div>
  );
}
