import { Badge } from '@/components/ui/badge';
import { Platform } from '@/db/repositories/platform.repository';

interface GamesBadgesProps {
  platform: Platform;
}

export function GamesBadges({ platform }: GamesBadgesProps) {
  const totalGames = platform.games.length;
  const ownedGames = platform.games.filter(game => game.inCollection).length;
  const missingGames = totalGames - ownedGames;

  return (
    <div className="flex flex-wrap gap-2">
      <Badge variant="secondary">{totalGames} Released</Badge>
      <Badge variant="secondary">{ownedGames} Owned</Badge>
      <Badge variant={missingGames > 0 ? 'destructive' : 'secondary'}>
        {missingGames} Missing
      </Badge>
    </div>
  );
}
