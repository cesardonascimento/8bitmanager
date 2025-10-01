'use client';

import { ArrowLeft, Gamepad2, History } from 'lucide-react';
import Link from 'next/link';
import { notFound, useParams, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import GamesTable from '@/components/game/games-table';
import { PlatformBadges } from '@/components/platform/platform-badges';
import PageLoader from '@/components/shared/page-loader';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
      <PageBreadcrumb platform={platform} />
      <PageTitle platform={platform} />
      <div className="space-y-4">
        <PageNavigation platform={platform} />
        <PageTable platform={platform} />
      </div>
    </div>
  );
}

const PageBreadcrumb = ({ platform }: { platform: Platform }) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/platforms">Platforms</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{platform.name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

const PageTitle = ({ platform }: { platform: Platform }) => {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <p className="text-muted-foreground">{platform.company}</p>
        <h1 className="text-3xl font-bold">{platform.name}</h1>
      </div>
      <PlatformBadges platform={platform} />
    </div>
  );
};

const PageNavigation = ({ platform }: { platform: Platform }) => {
  const pathname = usePathname();
  const currentTab = pathname.includes('/game-lists') ? 'gameLists' : 'games';

  return (
    <div className="flex justify-between items-center">
      <Tabs value={currentTab} className="w-auto">
        <TabsList>
          <TabsTrigger value="games" asChild>
            <Link href={`/platforms/${platform.id}`}>
              <Gamepad2 />
              Games
            </Link>
          </TabsTrigger>
          <TabsTrigger value="gameLists" asChild>
            <Link href={`/platforms/${platform.id}/game-lists`}>
              <History />
              Game Lists
            </Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <Button variant="outline" asChild>
        <Link href={`/platforms`}>
          <ArrowLeft />
          Back
        </Link>
      </Button>
    </div>
  );
};

const PageTable = ({ platform }: { platform: Platform }) => {
  return (
    <div className="flex flex-col gap-6 p-6 border rounded-md">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold">Games</h2>
        <p className="text-muted-foreground">
          This list contains all official licensed games released for this
          platform.
        </p>
      </div>
      <GamesTable games={platform.games} platformId={platform.id} />
    </div>
  );
};
