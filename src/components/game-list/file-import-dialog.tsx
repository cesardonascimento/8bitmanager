'use client';

import { FileUp } from 'lucide-react';
import { useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { GameListContentItem } from '@/db/repositories/game-list.repository';
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
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export type FileImportDialogProps = {
  platformId: string;
};

export default function FileImportDialog({
  platformId,
}: FileImportDialogProps) {
  const [gameListContent, setGameListContent] = useState<
    Record<string, GameListContentItem>
  >({});
  const [isFileSelected, setIsFileSelected] = useState(false);

  const gamesFound = useMemo(
    () => Object.keys(gameListContent).length,
    [gameListContent]
  );

  const { notifySuccess, notifyError } = useNotification();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setGameListContent({});
      setIsFileSelected(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = e => {
      const xmlContent = e.target?.result as string;
      parseGameList(xmlContent);
    };
    reader.readAsText(file);
    setIsFileSelected(true);
  };

  const parseGameList = (xmlContent: string) => {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlContent, 'text/xml');
      const gameElements = xmlDoc.getElementsByTagName('game');
      const gameTitles: string[] = [];

      for (let i = 0; i < gameElements.length; i++) {
        const gameElement = gameElements[i];
        const nameElement = gameElement.getElementsByTagName('name')[0];
        if (nameElement && nameElement.textContent) {
          gameTitles.push(nameElement.textContent);
        }
      }

      const sortedGameTitles = gameTitles.sort((a, b) => a.localeCompare(b));

      const gameListContent = sortedGameTitles.reduce(
        (acc, gameTitle) => {
          const id = uuidv4();
          const titleNormalized = normalizeTitle(gameTitle);

          acc[id] = {
            id,
            title: gameTitle,
            titleNormalized,
            releasedGameId: '',
            releasedGameCandidates: [],
          };
          return acc;
        },
        {} as Record<string, GameListContentItem>
      );

      setGameListContent(gameListContent);
    } catch (error) {
      notifyError('Error parsing XML');
    }
  };

  const handleSubmit = async () => {
    try {
      const gameList = {
        platformId,
        content: gameListContent,
        gamesCount: gamesFound,
      };

      await createRequest(`/game-lists`, gameList);

      notifySuccess('Game list imported successfully');
    } catch (error) {
      notifyError('Error importing game list');
    }
  };

  return (
    <Dialog onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <FileUp />
          Import gamelist.xml
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import gamelist.xml</DialogTitle>
          <DialogDescription>
            This will scan for all owned games in your collection.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <Label htmlFor="name-1">Select the file</Label>
          <Input
            id="game-list-file"
            type="file"
            accept=".xml"
            onChange={handleFileSelect}
          />
          {isFileSelected && (
            <p className="text-muted-foreground">
              {gamesFound > 0 ? `${gamesFound} games found` : 'No games found'}
            </p>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            disabled={!isFileSelected || gamesFound === 0}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
