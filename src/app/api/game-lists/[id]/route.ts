import { NextResponse } from 'next/server';
import { GameListRepository } from '@/db/repositories/game-list.repository';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const gameList = await GameListRepository.fetch(id);

    if (!gameList) {
      return NextResponse.json({ error: 'Record not found' }, { status: 404 });
    }

    return NextResponse.json(gameList);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
