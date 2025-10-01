'use client';

import { useEffect, useState } from 'react';
import PlatformsTable from '@/components/platform/platforms-table';
import PageLoader from '@/components/shared/page-loader';
import { Platform } from '@/db/repositories/platform.repository';
import { fetchRequest } from '@/lib/api/client';

export default function Page() {
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlatform = async () => {
      const data = await fetchRequest(`/platforms`);
      setPlatforms(data as Platform[]);
      setLoading(false);
    };
    fetchPlatform();
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="space-y-8">
      <PageTitle />
      <div className="space-y-4">
        <PageTable platforms={platforms} />
      </div>
    </div>
  );
}
const PageTitle = () => {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Platforms</h1>
        <p className="text-muted-foreground">
          Browse and manage your gaming platforms
        </p>
      </div>
    </div>
  );
};

const PageTable = ({ platforms }: { platforms: Platform[] }) => {
  return <PlatformsTable platforms={platforms} />;
};
