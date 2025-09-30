'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { GamesBadges } from '@/components/platform/games-badges';
import PageLoader from '@/components/shared/page-loader';
import { Button } from '@/components/ui/button';
import { Platform } from '@/db/repositories/platform.repository';
import { fetchRequest } from '@/lib/api/client';

export default function Page() {
  const { id } = useParams();

  const [platform, setPlatform] = useState<Platform | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlatform = async () => {
      const data = await fetchRequest(`/platforms/${id}`);
      setPlatform(data as Platform);
      setLoading(false);
    };
    fetchPlatform();
  }, [id]);

  if (loading) {
    return <PageLoader />;
  }

  if (!platform) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Button variant="ghost" asChild>
          <Link href={`/platforms/${id}`}>
            <ArrowLeft />
            Back
          </Link>
        </Button>
        <div className="space-y-1">
          <p className="text-muted-foreground">{platform.company}</p>
          <h1 className="text-3xl font-bold">{platform.name}</h1>
        </div>
        <GamesBadges platform={platform} />
      </div>
    </div>
  );
}
