import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Goal } from 'lucide-react';
import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { GameList } from '@/db/repositories/game-list.repository';
import { Game } from '@/db/repositories/game.repository';
import { GameListContentItem } from '@/db/schema';
import { updateRequest } from '@/lib/api/client';
import DataTable from '../shared/data-table';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

export type GameListContentTableProps = {
  gameList: GameList;
  games: Game[];
};

export default function GameListContentTable({
  gameList: initialGameList,
  games,
}: GameListContentTableProps) {
  const [gameList, setGameList] = useState<GameList>(initialGameList);
  const [loadingSetCandidates, setLoadingSetCandidates] = useState(false);

  const mappedGames = games.reduce(
    (acc, game) => ({
      ...acc,
      [game.id]: game,
    }),
    {} as Record<string, Game>
  );

  const handleSelectCandidate = async (
    contentItemId: string,
    releasedGameId: string
  ) => {
    setLoadingSetCandidates(true);
    const updatedContent = await updateRequest(
      `/game-lists/${gameList.id}/content/${contentItemId}`,
      {
        releasedGameId,
      }
    );
    setGameList(updatedContent as GameList);
    setLoadingSetCandidates(false);
  };

  const columns: ColumnDef<GameListContentItem>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={value => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'id',
      header: ({ column }) => {
        return (
          <Button
            variant="link"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            ID
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue('id')}</div>,
    },
    {
      accessorKey: 'title',
      header: ({ column }) => {
        return (
          <Button
            variant="link"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Title
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue('title')}</div>,
    },
    {
      accessorKey: 'titleNormalized',
      header: ({ column }) => {
        return (
          <Button
            variant="link"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Title normalized
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue('titleNormalized')}</div>,
    },
    {
      accessorKey: 'releasedGameId',
      header: ({ column }) => {
        return (
          <Button
            variant="link"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Status
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => {
        if (row.getValue('releasedGameId')) {
          return <Badge variant="secondary">Has match</Badge>;
        }

        return <Badge variant="destructive">No match</Badge>;
      },
    },
    {
      accessorKey: 'releasedGameCandidates',
      header: ({ column }) => {
        return (
          <Button
            variant="link"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Matching game
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => {
        const releasedGameId = row.getValue('releasedGameId') as string;
        const releasedGameCandidates = row.getValue(
          'releasedGameCandidates'
        ) as string[];

        if (releasedGameId) {
          const game = mappedGames[releasedGameId];
          return <div>{game.title}</div>;
        }

        if (!releasedGameId) {
          return (
            <div className="flex flex-col gap-4">
              {releasedGameCandidates.map(candidate => {
                const game = mappedGames[candidate];

                return (
                  <Button
                    disabled={loadingSetCandidates}
                    size="sm"
                    className="cursor-pointer w-fit"
                    key={candidate}
                    variant="secondary"
                    onClick={() =>
                      handleSelectCandidate(row.getValue('id'), candidate)
                    }
                  >
                    <Goal />
                    {game.title}
                  </Button>
                );
              })}
            </div>
          );
        }
      },
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={Object.values(gameList.content)}
      filterKeys={['id']}
    />
  );
}
