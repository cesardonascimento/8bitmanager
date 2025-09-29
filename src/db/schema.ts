import { sqliteTable, text, int } from 'drizzle-orm/sqlite-core';

export const platformsTable = sqliteTable('platforms', {
  id: text().primaryKey(),
  company: text(),
  name: text().notNull(),
});

export const gamesTable = sqliteTable('games', {
  id: int().primaryKey({ autoIncrement: true }),
  platformId: text().references(() => platformsTable.id),
  title: text().notNull(),
  titleVariants: text(),
  titleNormalized: text().notNull(),
});
