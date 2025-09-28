import { useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export type GamesTableProps = {
  games: string[][];
};

export default function GamesTable({ games }: GamesTableProps) {
  const normalizedGameTitles = useMemo(() => {
    return games.map(game =>
      game[0]
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z0-9\s]/g, '')
        .replace(/\s+/g, ' ')
        .trim()
    );
  }, [games]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Alternate Title</TableHead>
          <TableHead>Normalized Title</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {games?.map((game, index) => (
          <TableRow key={index}>
            <TableCell>{game[0]}</TableCell>
            <TableCell>
              {game.length > 1 ? game.slice(1).join(', ') : '-'}
            </TableCell>
            <TableCell>{normalizedGameTitles[index]}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
