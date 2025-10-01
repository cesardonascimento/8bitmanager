import { NextResponse } from 'next/server';
import { GameRepository } from '@/db/repositories/game.repository';

export async function GET() {
  try {
    const games = await GameRepository.list();
    return NextResponse.json(games);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
