import { ColumnDef } from '@tanstack/react-table';
import {
  ArrowUpDown,
  Check,
  CheckCircle2,
  CircleX,
  Trash2,
} from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Game } from '@/db/repositories/game.repository';
import { deleteRequest, updateRequest } from '@/lib/api/client';
import FileImportDialog from '../game-list/file-import-dialog';
import DataTable from '../shared/data-table';
import { Button } from '../ui/button';
import AddGamesDialog from './add-games-dialog';

export type GamesTableProps = {
  games: Game[];
  platformId: string;
};

export default function GamesTable({
  games: initialGames,
  platformId,
}: GamesTableProps) {
  const [games, setGames] = useState<Game[]>(initialGames);
  const [isLoading, setIsLoading] = useState(false);

  const columns: ColumnDef<Game>[] = [
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
      accessorKey: 'titleVariants',
      header: ({ column }) => {
        return (
          <Button
            variant="link"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Title variants
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <>
          {(row.getValue('titleVariants') as string[]).map(
            (variant: string) => (
              <div key={variant}>{variant}</div>
            )
          )}
        </>
      ),
    },
    {
      accessorKey: 'origin',
      header: ({ column }) => {
        return (
          <Button
            variant="link"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Origin
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue('origin')}</div>,
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
      accessorKey: 'inCollection',
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
        const inCollection = row.getValue('inCollection') as boolean;

        return (
          <div className="flex justify-center">
            {inCollection && (
              <Badge variant="outline">
                <CheckCircle2 className="text-green-500" /> Owned
              </Badge>
            )}
            {!inCollection && (
              <Badge variant="outline">
                <CircleX className="text-red-500" /> Missing
              </Badge>
            )}
          </div>
        );
      },
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <div className="flex gap-2">
            {!row.original.inCollection && (
              <Button
                disabled={isLoading}
                variant="outline"
                onClick={() => handleManualCheck(row.original.id)}
              >
                <Check />
              </Button>
            )}
            <Button
              disabled={isLoading}
              variant="outline"
              onClick={() => handleDeleteGame(row.original.id)}
            >
              <Trash2 className="text-destructive" />
            </Button>
          </div>
        );
      },
    },
  ];

  const handleManualCheck = async (gameId: string) => {
    setIsLoading(true);
    const updatedGame = await updateRequest(`/games/${gameId}`, {
      inCollection: true,
    });

    setGames(prevGames =>
      prevGames.map(game => (game.id === gameId ? updatedGame : game))
    );
    setIsLoading(false);
  };

  const handleDeleteGame = async (gameId: string) => {
    setIsLoading(true);
    await deleteRequest(`/games/${gameId}`);
    setGames(prevGames => prevGames.filter(game => game.id !== gameId));
    setIsLoading(false);
  };

  const handleAddGames = (newGames: Game[]) => {
    setGames(prevGames => [...prevGames, ...newGames]);
  };

  return (
    <DataTable
      columns={columns}
      customActions={
        <>
          <AddGamesDialog platformId={platformId} onSuccess={handleAddGames} />
          <FileImportDialog platformId={platformId} />
        </>
      }
      data={games}
      filterKeys={['title', 'id']}
    />
  );
}
