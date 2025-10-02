'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { GameListBadges } from '@/components/game-list/game-list-badges';
import GameListContentTable from '@/components/game-list/game-list-content-table';
import PageLoader from '@/components/shared/page-loader';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { GameList } from '@/db/repositories/game-list.repository';
import { Game } from '@/db/repositories/game.repository';
import { Platform } from '@/db/repositories/platform.repository';
import { fetchRequest } from '@/lib/api/client';

export default function Page() {
  const { id: platformId, gameListId } = useParams();

  const [gameList, setGameList] = useState<GameList | null>(null);
  const [platform, setPlatform] = useState<Platform | null>(null);
  const [games, setGames] = useState<Game[]>([]);
  const [loadingPlatform, setLoadingPlatform] = useState(true);
  const [loadingGameList, setLoadingGameList] = useState(true);
  const [loadingGames, setLoadingGames] = useState(true);

  useEffect(() => {
    const fetchPlatform = async () => {
      const data = await fetchRequest(`/platforms/${platformId}`);
      setPlatform(data as Platform);
      setLoadingPlatform(false);
    };
    fetchPlatform();
  }, [platformId]);

  useEffect(() => {
    const fetchGameList = async () => {
      const data = await fetchRequest(`/game-lists/${gameListId}`);
      setGameList(data as GameList);
      setLoadingGameList(false);
    };
    fetchGameList();
  }, [gameListId]);

  useEffect(() => {
    const fetchGames = async () => {
      const data = await fetchRequest(`/games?platformId=${platformId}`);
      setGames(data as Game[]);
      setLoadingGames(false);
    };
    fetchGames();
  }, [platformId]);

  if (loadingPlatform || loadingGameList || loadingGames) {
    return <PageLoader />;
  }

  if (!gameList || !platform || !games) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <PageBreadcrumb gameList={gameList} platform={platform} />
      <PageTitle gameList={gameList} platform={platform} />
      <div className="space-y-4">
        <PageNavigation platform={platform} />
        <PageTable gameList={gameList} games={games} />
      </div>
    </div>
  );
}

const PageBreadcrumb = ({
  gameList,
  platform,
}: {
  gameList: GameList;
  platform: Platform;
}) => {
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
          <BreadcrumbLink asChild>
            <Link href={`/platforms/${platform.id}`}>{platform.name}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={`/platforms/${platform.id}/game-lists`}>
              Game lists
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{gameList.id}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

const PageTitle = ({
  gameList,
  platform,
}: {
  gameList: GameList;
  platform: Platform;
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <p className="text-muted-foreground">{`${platform.company} - ${platform.name}`}</p>
        <h1 className="text-3xl font-bold">{gameList.id}</h1>
      </div>
      <GameListBadges gameList={gameList} />
    </div>
  );
};

const PageNavigation = ({ platform }: { platform: Platform }) => {
  return (
    <div className="flex justify-end items-center">
      <Button variant="outline" asChild>
        <Link href={`/platforms/${platform.id}`}>
          <ArrowLeft />
          Back
        </Link>
      </Button>
    </div>
  );
};

const PageTable = ({
  gameList,
  games,
}: {
  gameList: GameList;
  games: Game[];
}) => {
  return (
    <div className="flex flex-col gap-6 p-6 border rounded-md">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold">Game list content</h2>
        <p className="text-muted-foreground">
          Manualy select the games that could not be automatically matched to a
          released game
        </p>
      </div>
      <GameListContentTable gameList={gameList} games={games} />
    </div>
  );
};
