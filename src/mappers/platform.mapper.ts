import { PlatformSelectSchema } from '@/db/services/platforms';
import { Platform } from '@/models/platform';

export function mapToPlatform(platform: PlatformSelectSchema): Platform {
  return {
    ...platform,
    ownedGames: JSON.parse(platform.ownedGames) as string[][],
    releasedGames: JSON.parse(platform.releasedGames) as string[][],
  };
}
