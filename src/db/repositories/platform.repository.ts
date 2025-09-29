import { eq } from 'drizzle-orm';
import { db } from '../index';
import { platformsTable } from '../schema';

export type PlatformInsert = typeof platformsTable.$inferInsert;
export type Platform = typeof platformsTable.$inferSelect;

export class PlatformRepository {
  static async list(): Promise<Platform[]> {
    return (await db.select().from(platformsTable)) as Platform[];
  }

  static async fetch(id: string): Promise<Platform | null> {
    const result = await db
      .select()
      .from(platformsTable)
      .where(eq(platformsTable.id, id));
    return result[0] as Platform | null;
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
