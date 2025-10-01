import { eq } from 'drizzle-orm';
import { db } from '../index';
import { gameListsTable } from '../schema';

export type GameListInsert = typeof gameListsTable.$inferInsert;
export type GameList = typeof gameListsTable.$inferSelect;

export class GameListRepository {
  static async list(platformId: string): Promise<GameList[]> {
    return (await db.query.gameListsTable.findMany({
      where: eq(gameListsTable.platformId, platformId),
    })) as GameList[];
  }

  static async fetch(id: string): Promise<GameList | null> {
    const result = await db.query.gameListsTable.findFirst({
      where: eq(gameListsTable.id, id),
    });
    return result || null;
  }

  static async create(gameList: GameListInsert): Promise<GameList> {
    console.log('gameList', gameList);
    const result = await db.insert(gameListsTable).values(gameList).returning();
    return result[0] as GameList;
  }

  static async update(
    id: string,
    gameList: Partial<GameListInsert>
  ): Promise<GameList | null> {
    const result = await db
      .update(gameListsTable)
      .set(gameList)
      .where(eq(gameListsTable.id, id))
      .returning();
    return result[0] as GameList | null;
  }

  static async delete(id: string): Promise<boolean> {
    const result = await db
      .delete(gameListsTable)
      .where(eq(gameListsTable.id, id));
    return result.rowsAffected > 0;
  }
}
