import { sqliteTable, text, int, customType } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const platformsTable = sqliteTable('platforms', {
  id: int().primaryKey({ autoIncrement: true }),
  company: text(),
  name: text().notNull(),
  releasedGames: text()
    .notNull()
    .default(sql`'[]'`),
  slug: text().notNull().unique(),
});
