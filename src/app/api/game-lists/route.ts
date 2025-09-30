import { NextResponse } from 'next/server';
import { GameListRepository } from '@/db/repositories/game-list.repository';

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
