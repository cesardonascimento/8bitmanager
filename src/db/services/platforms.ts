import { db } from '../index';
import { platformsTable } from '../schema';
import { eq } from 'drizzle-orm';

export type Platform = typeof platformsTable.$inferSelect;
export type NewPlatform = typeof platformsTable.$inferInsert;

export class PlatformsService {
  static async getAll(): Promise<Platform[]> {
    return (await db.select().from(platformsTable)) as Platform[];
  }

  static async getById(id: number): Promise<Platform | null> {
    const result = await db
      .select()
      .from(platformsTable)
      .where(eq(platformsTable.id, id));
    return result[0] as Platform | null;
  }

  static async getBySlug(slug: string): Promise<Platform | null> {
    const result = await db
      .select()
      .from(platformsTable)
      .where(eq(platformsTable.slug, slug));
    return result[0] as Platform | null;
  }

  static async create(platform: NewPlatform): Promise<Platform> {
    const result = await db.insert(platformsTable).values(platform).returning();
    return result[0] as Platform;
  }

  static async update(
    id: number,
    platform: Partial<NewPlatform>
  ): Promise<Platform | null> {
    const result = await db
      .update(platformsTable)
      .set(platform)
      .where(eq(platformsTable.id, id))
      .returning();
    return result[0] as Platform | null;
  }

  static async delete(id: number): Promise<boolean> {
    const result = await db
      .delete(platformsTable)
      .where(eq(platformsTable.id, id));
    return result.rowsAffected > 0;
  }
}
