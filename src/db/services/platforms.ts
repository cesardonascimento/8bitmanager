import { eq } from 'drizzle-orm';
import { db } from '../index';
import { platformsTable } from '../schema';

export type PlatformInsertSchema = typeof platformsTable.$inferInsert;
export type PlatformSelectSchema = typeof platformsTable.$inferSelect;

export class PlatformsService {
  static async getAll(): Promise<PlatformSelectSchema[]> {
    return (await db.select().from(platformsTable)) as PlatformSelectSchema[];
  }

  static async getById(id: number): Promise<PlatformSelectSchema | null> {
    const result = await db
      .select()
      .from(platformsTable)
      .where(eq(platformsTable.id, id));
    return result[0] as PlatformSelectSchema | null;
  }

  static async getBySlug(slug: string): Promise<PlatformSelectSchema | null> {
    const result = await db
      .select()
      .from(platformsTable)
      .where(eq(platformsTable.slug, slug));
    return result[0] as PlatformSelectSchema | null;
  }

  static async create(
    platform: PlatformInsertSchema
  ): Promise<PlatformSelectSchema> {
    const result = await db.insert(platformsTable).values(platform).returning();
    return result[0] as PlatformSelectSchema;
  }

  static async update(
    id: number,
    platform: Partial<PlatformInsertSchema>
  ): Promise<PlatformSelectSchema | null> {
    const result = await db
      .update(platformsTable)
      .set(platform)
      .where(eq(platformsTable.id, id))
      .returning();
    return result[0] as PlatformSelectSchema | null;
  }

  static async delete(id: number): Promise<boolean> {
    const result = await db
      .delete(platformsTable)
      .where(eq(platformsTable.id, id));
    return result.rowsAffected > 0;
  }
}
