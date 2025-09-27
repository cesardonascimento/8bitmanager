import { sqliteTable, text, int } from 'drizzle-orm/sqlite-core';

export const platformsTable = sqliteTable('platforms', {
  id: int().primaryKey({ autoIncrement: true }),
  company: text(),
  name: text().notNull(),
  releasedGames: text().$type<string[][]>(),
  slug: text().notNull().unique(),
});
