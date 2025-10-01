import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, SquarePen } from 'lucide-react';
import Link from 'next/link';
import { Checkbox } from '@/components/ui/checkbox';
import { Platform } from '@/db/repositories/platform.repository';
import DataTable from '../shared/data-table';
import { Button } from '../ui/button';

export type PlatformsTableProps = {
  platforms: Platform[];
};

export const columns: ColumnDef<Platform>[] = [
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
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'company',
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Company
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue('company') || '-'}</div>,
  },
  {
    accessorKey: 'releasedGamesCount',
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="link"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Released games
            <ArrowUpDown />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue('releasedGamesCount')}</div>
    ),
  },
  {
    accessorKey: 'collectionGamesCount',
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="link"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Collection games
            <ArrowUpDown />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue('collectionGamesCount')}</div>
    ),
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <Button variant="outline" asChild>
          <Link href={`/platforms/${row.original.id}`}>
            <SquarePen />
          </Link>
        </Button>
      );
    },
  },
];

export default function PlatformsTable({ platforms }: PlatformsTableProps) {
  return <DataTable columns={columns} data={platforms} filterKeys={['id']} />;
}
