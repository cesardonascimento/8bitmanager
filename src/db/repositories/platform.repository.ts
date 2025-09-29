import { eq, asc, desc } from 'drizzle-orm';
import { db } from '../index';
import { platformsTable, gamesTable } from '../schema';

export type PlatformInsert = typeof platformsTable.$inferInsert;
export type Platform = typeof platformsTable.$inferSelect & {
  games: Array<typeof gamesTable.$inferSelect>;
};

export class PlatformRepository {
  static async list(
    orderBy: keyof typeof platformsTable.$inferSelect = 'name',
    orderDirection: string = 'asc'
  ): Promise<Platform[]> {
    return (await db.query.platformsTable.findMany({
      with: {
        games: true,
      },
      orderBy:
        orderDirection === 'asc'
          ? asc(platformsTable[orderBy])
          : desc(platformsTable[orderBy]),
    })) as Platform[];
  }

  static async fetch(id: string): Promise<Platform | null> {
    const result = await db.query.platformsTable.findFirst({
      where: eq(platformsTable.id, id),
      with: {
        games: true,
      },
    });

    return result || null;
  }

  static async create(platform: PlatformInsert): Promise<Platform> {
    const result = await db.insert(platformsTable).values(platform).returning();
    return result[0] as Platform;
  }

  static async update(
    id: string,
    platform: Partial<PlatformInsert>
  ): Promise<Platform | null> {
    const result = await db
      .update(platformsTable)
      .set(platform)
      .where(eq(platformsTable.id, id))
      .returning();
    return result[0] as Platform | null;
  }

  static async delete(id: string): Promise<boolean> {
    const result = await db
      .delete(platformsTable)
      .where(eq(platformsTable.id, id));
    return result.rowsAffected > 0;
  }
}
