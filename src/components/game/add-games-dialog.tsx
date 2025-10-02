'use client';

import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Game } from '@/db/repositories/game.repository';
import { createRequest } from '@/lib/api/client';
import { normalizeTitle } from '@/lib/games/utils';
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
  DialogTrigger,
} from '../ui/dialog';
import { Textarea } from '../ui/textarea';

export type AddGamesDialogProps = {
  platformId: string;
  onSuccess: (games: Game[]) => void;
};

export default function AddGamesDialog({
  platformId,
  onSuccess,
}: AddGamesDialogProps) {
  const [text, setText] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { notifySuccess, notifyError } = useNotification();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setText('');
    }

    setIsOpen(open);
  };

  const handleSubmit = async () => {
    try {
      setIsSaving(true);

      const gameTitles = text
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);

      const mappedGames = gameTitles.map(title => ({
        platformId,
        inCollection: true,
        origin: 'manual',
        title,
        titleNormalized: normalizeTitle(title),
      }));

      const createdGames = await createRequest(`/games`, mappedGames);

      notifySuccess(`${createdGames.length} games added successfully`);
      handleOpenChange(false);
      setIsSaving(false);
      onSuccess(createdGames as Game[]);
    } catch (error) {
      notifyError('Error adding games', error);
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus />
          Add games
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add games</DialogTitle>
          <DialogDescription>Add each game on a new line.</DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <Textarea
            id="games-input"
            value={text}
            onChange={e => setText(e.target.value)}
          />
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
            <Button disabled={!text} onClick={handleSubmit}>
              Save
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
