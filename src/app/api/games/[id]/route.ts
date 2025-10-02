import { GameRepository } from '@/db/repositories/game.repository';
import { respondSuccess } from '@/lib/api/server';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const game = await request.json();
  const updatedGame = await GameRepository.update(id, game);
  return respondSuccess(updatedGame);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await GameRepository.delete(id);
  return respondSuccess(id);
}
