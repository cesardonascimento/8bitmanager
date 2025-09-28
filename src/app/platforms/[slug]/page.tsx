'use client';

import { fetchRequest } from '@/lib/api';
import { mapToPlatform } from '@/mappers/platform.mapper';
import { Platform } from '@/models/platform';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

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

  return (
    <>
      {platform && (
        <>
          <h1>{platform.name}</h1>
          <p>{platform.company}</p>

          <div className="flex flex-col gap-2">
            {platform.releasedGames?.map((game, index) => (
              <div key={index}>{game}</div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
