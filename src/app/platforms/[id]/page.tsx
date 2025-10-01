'use client';

import { ArrowLeft, Gamepad2, History } from 'lucide-react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import GamesTable from '@/components/game/games-table';
import GameListsTable from '@/components/game-list/game-lists-table';
import { GamesBadges } from '@/components/platform/games-badges';
import PageLoader from '@/components/shared/page-loader';
import { Button } from '@/components/ui/button';
import { TabsList, TabsContent, TabsTrigger, Tabs } from '@/components/ui/tabs';
import { GameList } from '@/db/repositories/game-list.repository';
import { Platform } from '@/db/repositories/platform.repository';
import { fetchRequest } from '@/lib/api/client';

export default function Page() {
  const { id } = useParams();

  const [platform, setPlatform] = useState<Platform | null>(null);
  const [gameLists, setGameLists] = useState<GameList[]>([]);
  const [loadingPlatform, setLoadingPlatform] = useState(true);
  const [loadingGameLists, setLoadingGameLists] = useState(true);

  useEffect(() => {
    const fetchPlatform = async () => {
      const data = await fetchRequest(`/platforms/${id}`);
      setPlatform(data as Platform);
      setLoadingPlatform(false);
    };
    fetchPlatform();
  }, [id]);

  useEffect(() => {
    const fetchGameLists = async () => {
      const data = await fetchRequest(`/game-lists?platformId=${id}`);
      setGameLists(data as GameList[]);
      setLoadingGameLists(false);
    };
    fetchGameLists();
  }, [id]);

  if (loadingPlatform || loadingGameLists) {
    return <PageLoader />;
  }

  if (!platform) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Button variant="ghost" asChild>
          <Link href="/platforms">
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
      <Tabs defaultValue="games">
        <TabsList>
          <TabsTrigger value="games">
            <Gamepad2 /> Games
          </TabsTrigger>
          <TabsTrigger value="game-lists">
            <History /> Imports
          </TabsTrigger>
        </TabsList>
        <TabsContent value="games">
          <div className="py-4">
            <GamesTable games={platform.games} platformId={platform.id} />
          </div>
        </TabsContent>
        <TabsContent value="game-lists">
          <div className="py-4">
            <GameListsTable gameLists={gameLists} platformId={platform.id} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
