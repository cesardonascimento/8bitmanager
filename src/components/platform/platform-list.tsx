import { Platform } from '@/db/repositories/platform.repository';
import { PlatformCard } from './platform-list-item';

interface PlatformListProps {
  platforms: Platform[];
}

export function PlatformList({ platforms }: PlatformListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {platforms.map(platform => (
        <PlatformCard key={platform.id} platform={platform} />
      ))}
    </div>
  );
}
