import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, CheckCircle2, CircleX } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Game } from '@/db/repositories/game.repository';
import FileImportDialog from '../game-list/file-import-dialog';
import DataTable from '../shared/data-table';
import { Button } from '../ui/button';

export type GamesTableProps = {
  games: Game[];
  platformId: string;
};

export const columns: ColumnDef<Game>[] = [
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
        {(row.getValue('titleVariants') as string[]).map((variant: string) => (
          <div key={variant}>{variant}</div>
        ))}
      </>
    ),
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
];

export default function GamesTable({ games, platformId }: GamesTableProps) {
  return (
    <DataTable
      columns={columns}
      customActions={<FileImportDialog platformId={platformId} />}
      data={games}
      filterKeys={['title', 'id']}
    />
  );
}
