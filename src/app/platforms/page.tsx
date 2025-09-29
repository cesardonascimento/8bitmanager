'use client';

import { useEffect, useState } from 'react';
import {
  PlatformCard,
  PlatformCardSkeleton,
} from '@/components/platform/platform-list-item';
import { Platform } from '@/db/repositories/platform.repository';
import { fetchRequest } from '@/lib/api/client';

export default function Page() {
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlatforms = async () => {
      const data = await fetchRequest('/platforms');
      setPlatforms(data as Platform[]);
      setLoading(false);
    };
    fetchPlatforms();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Platforms</h1>
        <p className="text-muted-foreground">
          Browse and manage your gaming platforms
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {loading && (
          <>
            <PlatformCardSkeleton />
            <PlatformCardSkeleton />
            <PlatformCardSkeleton />
            <PlatformCardSkeleton />
          </>
        )}

        {!loading &&
          platforms.map(platform => (
            <PlatformCard key={platform.id} platform={platform} />
          ))}
      </div>
    </div>
  );
}
