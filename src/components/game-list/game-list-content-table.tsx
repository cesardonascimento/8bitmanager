import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Goal, Plus, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { GameList } from '@/db/repositories/game-list.repository';
import { Game } from '@/db/repositories/game.repository';
import { GameListContentItem } from '@/db/schema';
import { createRequest, deleteRequest, updateRequest } from '@/lib/api/client';
import { normalizeTitle } from '@/lib/games/utils';
import DataTable from '../shared/data-table';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import FindMatchingGameDialog from './find-matching-game-dialog';

export type GameListContentTableProps = {
  gameList: GameList;
  games: Game[];
};

export default function GameListContentTable({
  gameList: initialGameList,
  games: initialGames,
}: GameListContentTableProps) {
  const [gameList, setGameList] = useState<GameList>(initialGameList);
  const [games, setGames] = useState<Game[]>(initialGames);
  const [loadingAction, setLoadingAction] = useState(false);
  const [selectedContentItem, setSelectedContentItem] =
    useState<GameListContentItem | null>(null);

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
    setLoadingAction(true);
    const updatedGameList = await updateRequest(
      `/game-lists/${gameList.id}/content/${contentItemId}`,
      {
        releasedGameId,
      }
    );
    setGameList(updatedGameList as GameList);
    setLoadingAction(false);
    return updatedGameList as GameList;
  };

  const handleFindMatchingGame = async (contentItemId: string) => {
    setSelectedContentItem(gameList.content[contentItemId]);
  };

  const handleAddToPlatform = async (contentItemId: string) => {
    setLoadingAction(true);
    const contentItem = gameList.content[contentItemId];
    const createdGames = await createRequest(`/games`, {
      platformId: gameList.platformId,
      inCollection: true,
      origin: 'manual',
      title: contentItem.title,
      titleVariants: [],
      titleNormalized: normalizeTitle(contentItem.title),
    });

    const updatedGameList = await handleSelectCandidate(
      contentItemId,
      createdGames[0].id
    );

    setGames(prevGames => [...prevGames, ...createdGames]);
    setGameList(updatedGameList as GameList);
    setLoadingAction(false);
  };

  const handleRemoveFromGameList = async (contentItemId: string) => {
    setLoadingAction(true);
    const updatedGameList = await deleteRequest(
      `/game-lists/${gameList.id}/content/${contentItemId}`
    );
    setGameList(updatedGameList as GameList);
    setLoadingAction(false);
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
          return <div>{game?.title}</div>;
        }

        if (!releasedGameId) {
          return (
            <div className="flex gap-4 flex-wrap">
              {releasedGameCandidates.map(candidate => {
                const game = mappedGames[candidate];

                return (
                  <Button
                    disabled={loadingAction}
                    size="sm"
                    className="cursor-pointer w-fit"
                    key={candidate}
                    variant="outline"
                    onClick={() =>
                      handleSelectCandidate(row.getValue('id'), candidate)
                    }
                  >
                    <Goal />
                    {game?.title}
                  </Button>
                );
              })}
            </div>
          );
        }
      },
    },
    {
      accessorKey: 'actions',
      header: ({}) => 'Actions',
      cell: ({ row }) => {
        if (row.getValue('releasedGameId')) {
          return (
            <Button
              disabled={loadingAction}
              variant="outline"
              className="cursor-pointer w-fit"
              size="sm"
              onClick={() => handleRemoveFromGameList(row.getValue('id'))}
            >
              <Trash2 className="text-destructive" />
              Remove
            </Button>
          );
        }

        return (
          <div className="flex gap-2">
            <Button
              disabled={loadingAction}
              variant="outline"
              className="cursor-pointer w-fit"
              size="sm"
              onClick={() => handleFindMatchingGame(row.getValue('id'))}
            >
              <Search />
              Find
            </Button>
            <Button
              disabled={loadingAction}
              variant="outline"
              className="cursor-pointer w-fit"
              size="sm"
              onClick={() => handleAddToPlatform(row.getValue('id'))}
            >
              <Plus />
              Add
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <DataTable
        columns={columns}
        data={Object.values(gameList.content)}
        filterKeys={['id']}
      />
      {selectedContentItem && (
        <FindMatchingGameDialog
          contentItem={selectedContentItem as GameListContentItem}
          onClose={() => setSelectedContentItem(null)}
          onUpdate={(contentItemId, releasedGameId) => {
            setSelectedContentItem(null);
            handleSelectCandidate(contentItemId, releasedGameId);
          }}
          games={games}
        />
      )}
    </>
  );
}
