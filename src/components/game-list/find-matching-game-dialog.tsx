'use client';

import { ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';
import { Game } from '@/db/repositories/game.repository';
import { GameListContentItem } from '@/db/schema';
import { useNotification } from '@/providers/notification-provider';
import { Button } from '../ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover';

export type FindMatchingGameDialogProps = {
  contentItem: GameListContentItem;
  games: Game[];
  onClose: () => void;
  onUpdate: (contentItemId: string, releasedGameId: string) => void;
};

export default function FindMatchingGameDialog({
  contentItem,
  games,
  onClose,
  onUpdate,
}: FindMatchingGameDialogProps) {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  const { notifyError } = useNotification();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const handleSelectGame = (selectedGame: Game) => {
    try {
      const matchingGame =
        games.find(game => game.title === selectedGame.title) || null;

      if (!matchingGame) {
        return;
      }

      setSelectedGame(matchingGame);
      setIsCommandOpen(false);
      onUpdate(contentItem.id, selectedGame.id);
      handleOpenChange(false);
    } catch (error) {
      notifyError('Error associating game', error);
    }
  };

  return (
    <Dialog onOpenChange={handleOpenChange} open>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Find matching game</DialogTitle>
          <DialogDescription>{contentItem.title}</DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <Popover open={isCommandOpen} onOpenChange={setIsCommandOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                {selectedGame ? <>{selectedGame.title}</> : <>Select game</>}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="p-0 w-[var(--radix-popover-trigger-width)]"
              side="bottom"
              align="start"
            >
              <Command>
                <CommandInput
                  placeholder="Search game by title..."
                  className="h-9"
                />
                <CommandList>
                  <CommandEmpty>No game found.</CommandEmpty>
                  <CommandGroup>
                    {games.map(game => (
                      <CommandItem
                        key={game.id}
                        value={game.title}
                        onSelect={() => handleSelectGame(game)}
                      >
                        {game.title}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </DialogContent>
    </Dialog>
  );
}
