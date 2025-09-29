import { CircleCheck, CircleX } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Game } from '@/db/repositories/game.repository';

export type GamesTableProps = {
  games: Game[];
};

export default function GamesTable({ games }: GamesTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Title variants</TableHead>
          <TableHead>Normalized title</TableHead>
          <TableHead className="text-center">In collection</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {games?.map((game, index) => (
          <TableRow key={index}>
            <TableCell>{game.title}</TableCell>
            <TableCell>
              {game.titleVariants ? game.titleVariants : '-'}
            </TableCell>
            <TableCell>{game.titleNormalized}</TableCell>
            <TableCell className="text-center">
              <div className="flex justify-center">
                {game.inCollection && (
                  <CircleCheck className="text-green-500" />
                )}
                {!game.inCollection && <CircleX className="text-red-500" />}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
