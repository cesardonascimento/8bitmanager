'use client';

import { useState } from 'react';
import { Game } from '@/db/repositories/game.repository';
import { GameListContentItem } from '@/db/schema';
import { useNotification } from '@/providers/notification-provider';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Label } from '../ui/label';

export type FindMatchingGameDialogProps = {
  contentItem: GameListContentItem;
  games: Game[];
  onClose: () => void;
};

export default function FindMatchingGameDialog({
  contentItem,
  games,
  onClose,
}: FindMatchingGameDialogProps) {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const { notifyError } = useNotification();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setSelectedGame(null);
      onClose();
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSaving(true);
      console.log('handleSubmit', contentItem, games);
      setIsSaving(false);
    } catch (error) {
      notifyError('Error associating game', error);
    }
  };

  return (
    <Dialog onOpenChange={handleOpenChange} open>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Find matching game</DialogTitle>
          <DialogDescription>
            Select the matching game from official games database.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <Label htmlFor="name-1">Select the file</Label>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button disabled={isSaving} variant="outline">
              Cancel
            </Button>
          </DialogClose>
          {isSaving ? (
            <Button disabled>Saving...</Button>
          ) : (
            <Button disabled={!selectedGame} onClick={handleSubmit}>
              Save
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
