import { PlatformSelectSchema } from '@/db/services/platforms';
import { Platform } from '@/models/platform';

export function mapToPlatform(platform: PlatformSelectSchema): Platform {
  return {
    ...platform,
    releasedGames: JSON.parse(platform.releasedGames) as string[][],
  };
}
