'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import GamesTable from '@/components/platform/games-table';
import { fetchRequest } from '@/lib/api';
import { mapToPlatform } from '@/mappers/platform.mapper';
import { Platform } from '@/models/platform';

export default function Page() {
  const { slug } = useParams();
  const [platform, setPlatform] = useState<Platform | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPlatform = async () => {
      setLoading(true);
      const data = await fetchRequest(`/platforms/${slug}`);
      setPlatform(mapToPlatform(data));
      setLoading(false);
    };
    fetchPlatform();
  }, [slug]);

  if (loading) {
    return <div>Loading platform...</div>;
  }

  if (!platform) {
    return <div>Platform not found</div>;
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-sm text-muted-foreground">{platform.company}</h2>
        <h1 className="text-2xl font-bold">{platform.name}</h1>
      </div>
      <div className="flex gap-4">
        <GamesTable games={platform.releasedGames} />
        <GamesTable games={platform.ownedGames} />
      </div>
    </div>
  );
}
