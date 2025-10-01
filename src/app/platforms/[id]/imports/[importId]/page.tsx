'use client';

import { format } from 'date-fns';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import PageLoader from '@/components/shared/page-loader';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GameList } from '@/db/repositories/game-list.repository';
import { fetchRequest } from '@/lib/api/client';

export default function Page() {
  const { importId } = useParams();

  const [gameList, setGameList] = useState<GameList | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGameList = async () => {
      const data = await fetchRequest(`/game-lists/${importId}`);
      setGameList(data as GameList);
      setLoading(false);
    };
    fetchGameList();
  }, [importId]);

  if (loading) {
    return <PageLoader />;
  }

  if (!gameList) {
    notFound();
  }

  // TODO:
  // - Migrar list de gamelists para uma página (talvez mudar de tabs para buttons)
  // - Criar botões de ação na tabela de jogos
  // - Redirecionar para a tela de detalhes da importação após o upload do arquivo
  // - Criar ação de selecionar candidatos
  // - Criar ação de escolher manualmente
  // - Criar ação de adicionar jogo na lista a partir da lista importada
  // - Adicionar coluna de origem na tabela de jogos
  // - Corrigir uploadedAt
  // - Adicionar informações da plataforma na tela de detalhes de importação
  // - Criar tabela de jogos importados (content da gamelist)

  const importedGames = gameList.gamesCount;
  const syncedGames = Object.values(gameList.content).filter(
    game => !!game.releasedGameId
  ).length;
  const missingGames = importedGames - syncedGames;

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Button variant="ghost" asChild>
          <Link href={`/platforms/${gameList.platformId}/imports`}>
            <ArrowLeft />
            Back
          </Link>
        </Button>
        <div className="space-y-1">
          <p className="text-muted-foreground">
            {format(gameList.uploadedAt, 'yyyy-MM-dd HH:mm')}
          </p>
          <h1 className="text-3xl font-bold">{gameList.id}</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{importedGames} Imported</Badge>
          <Badge variant="secondary">{syncedGames} Synced</Badge>
          <Badge variant={missingGames > 0 ? 'destructive' : 'secondary'}>
            {missingGames} Missing
          </Badge>
        </div>
      </div>
      <div className="py-4"></div>
    </div>
  );
}
