'use client';

import { fetchRequest } from '@/lib/api';
import { Platform } from '@/models/platform';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { mapToPlatform } from '@/mappers/platform.mapper';

export default function Page() {
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPlatforms = async () => {
      setLoading(true);
      const data = await fetchRequest('/platforms');
      setPlatforms(data.map(mapToPlatform));
      setLoading(false);
    };

    fetchPlatforms();
  }, []);

  if (loading) {
    return <div>Loading platforms...</div>;
  }

  return (
    <div>
      {platforms?.map(platform => (
        <div className="flex flex-col gap-2" key={platform.id}>
          <Link href={`/platforms/${platform.slug}`}>{platform.name}</Link>
        </div>
      ))}
    </div>
  );
}
