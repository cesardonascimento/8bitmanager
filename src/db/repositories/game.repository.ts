import { eq } from 'drizzle-orm';
import { db } from '../index';
import { gamesTable } from '../schema';

export type GameInsert = typeof gamesTable.$inferInsert;
export type Game = typeof gamesTable.$inferSelect;

export class GameRepository {
  static async list(): Promise<Game[]> {
    return (await db.query.gamesTable.findMany()) as Game[];
  }

  static async fetch(id: number): Promise<Game | null> {
    const result = await db.query.gamesTable.findFirst({
      where: eq(gamesTable.id, id),
    });
    return result || null;
  }

  static async create(game: GameInsert): Promise<Game> {
    const result = await db.insert(gamesTable).values(game).returning();
    return result[0] as Game;
  }

  static async update(
    id: number,
    game: Partial<GameInsert>
  ): Promise<Game | null> {
    const result = await db
      .update(gamesTable)
      .set(game)
      .where(eq(gamesTable.id, id))
      .returning();
    return result[0] as Game | null;
  }

  static async delete(id: number): Promise<boolean> {
    const result = await db.delete(gamesTable).where(eq(gamesTable.id, id));
    return result.rowsAffected > 0;
  }
}
