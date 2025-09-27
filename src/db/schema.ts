import { sqliteTable, text, int } from 'drizzle-orm/sqlite-core';

export const platformsTable = sqliteTable('platforms', {
  id: int().primaryKey({ autoIncrement: true }),
  company: text().notNull(),
  name: text().notNull(),
});
