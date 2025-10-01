import { NextResponse } from 'next/server';
import {
  GameListInsert,
  GameListRepository,
} from '@/db/repositories/game-list.repository';
import { PlatformRepository } from '@/db/repositories/platform.repository';
import { scanGameListContent as scanGameListContent } from '@/services/game-list.service';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const platformId = searchParams.get('platformId');

  if (!platformId) {
    return NextResponse.json(
      { error: 'Platform ID is required' },
      { status: 400 }
    );
  }

  try {
    const gameLists = await GameListRepository.list(platformId);

    if (!gameLists) {
      return NextResponse.json({ error: 'Record not found' }, { status: 404 });
    }

    return NextResponse.json(gameLists);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const gameList = await request.json();
    const platform = await PlatformRepository.fetch(gameList.platformId);

    if (!platform) {
      return NextResponse.json(
        { error: 'Platform not found' },
        { status: 404 }
      );
    }

    const scannedContent = await scanGameListContent(platform, gameList);

    const createdGameList = await GameListRepository.create({
      ...gameList,
      content: scannedContent,
    } as GameListInsert);

    console.log('createdGameList', createdGameList);

    return NextResponse.json(createdGameList);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
