import { Badge } from '@/components/ui/badge';
import { Platform } from '@/db/repositories/platform.repository';

interface PlatformBadgesProps {
  platform: Platform;
}

export function PlatformBadges({ platform }: PlatformBadgesProps) {
  const missingGames =
    platform.releasedGamesCount - platform.collectionGamesCount;

  return (
    <div className="flex flex-wrap gap-2">
      <Badge variant="secondary">{platform.releasedGamesCount} Released</Badge>
      <Badge variant="secondary">{platform.collectionGamesCount} Owned</Badge>
      <Badge variant={missingGames > 0 ? 'destructive' : 'secondary'}>
        {missingGames} Missing
      </Badge>
    </div>
  );
}
