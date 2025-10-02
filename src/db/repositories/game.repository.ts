import { asc, desc, eq } from 'drizzle-orm';
import { db } from '../index';
import { gamesTable } from '../schema';

export type GameInsert = typeof gamesTable.$inferInsert;
export type Game = typeof gamesTable.$inferSelect;

export class GameRepository {
  static async list(
    platformId: string,
    orderBy: keyof typeof gamesTable.$inferSelect = 'title',
    orderDirection: string = 'asc'
  ): Promise<Game[]> {
    return (await db.query.gamesTable.findMany({
      where: eq(gamesTable.platformId, platformId),
      orderBy:
        orderDirection === 'asc'
          ? asc(gamesTable[orderBy])
          : desc(gamesTable[orderBy]),
    })) as Game[];
  }

  static async fetch(id: string): Promise<Game | null> {
    const result = await db.query.gamesTable.findFirst({
      where: eq(gamesTable.id, id),
    });
    return result || null;
  }

  static async createMany(games: GameInsert[]): Promise<Game[]> {
    return await db.insert(gamesTable).values(games).returning();
  }

  static async update(
    id: string,
    game: Partial<GameInsert>
  ): Promise<Game | null> {
    const result = await db
      .update(gamesTable)
      .set(game)
      .where(eq(gamesTable.id, id))
      .returning();
    return result[0] as Game | null;
  }

  static async delete(id: string): Promise<boolean> {
    const result = await db.delete(gamesTable).where(eq(gamesTable.id, id));
    return result.rowsAffected > 0;
  }

  static async updateMany(games: Partial<GameInsert>[]): Promise<Game[]> {
    const results: Game[] = [];

    await db.transaction(async tx => {
      for (const game of games) {
        if (game.id) {
          const result = await tx
            .update(gamesTable)
            .set(game)
            .where(eq(gamesTable.id, game.id))
            .returning();
          if (result[0]) {
            results.push(result[0] as Game);
          }
        }
      }
    });

    return results;
  }
}
