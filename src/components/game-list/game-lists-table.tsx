import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { ArrowUpDown, SquarePen } from 'lucide-react';
import Link from 'next/link';
import { Checkbox } from '@/components/ui/checkbox';
import { GameList } from '@/db/repositories/game-list.repository';
import DataTable from '../shared/data-table';
import { Button } from '../ui/button';
import FileImportDialog from './file-import-dialog';

export type GameListsTableProps = {
  gameLists: GameList[];
  platformId: string;
};

export const columns: ColumnDef<GameList>[] = [
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
    accessorKey: 'uploadedAt',
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Uploaded at
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue('uploadedAt') as string;
      return <div>{format(new Date(date), 'yyyy-MM-dd HH:mm')}</div>;
    },
  },
  {
    accessorKey: 'gamesCount',
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="link"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Games count
            <ArrowUpDown />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue('gamesCount')}</div>
    ),
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <Button variant="outline" asChild>
          <Link
            href={`/platforms/${row.original.platformId}/imports/${row.original.id}`}
          >
            <SquarePen />
          </Link>
        </Button>
      );
    },
  },
];

export default function GameListsTable({
  gameLists,
  platformId,
}: GameListsTableProps) {
  return (
    <DataTable
      columns={columns}
      customActions={<FileImportDialog platformId={platformId} />}
      data={gameLists}
      filterKeys={['id']}
    />
  );
}
