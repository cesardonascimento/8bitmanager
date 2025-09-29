import { relations } from 'drizzle-orm';
import { sqliteTable, text, int } from 'drizzle-orm/sqlite-core';

export const platformsTable = sqliteTable('platforms', {
  id: text().primaryKey(),
  company: text(),
  name: text().notNull(),
});

export const gamesTable = sqliteTable('games', {
  id: int().primaryKey({ autoIncrement: true }),
  platformId: text(),
  title: text().notNull(),
  titleVariants: text(),
  titleNormalized: text().notNull(),
});

export const platformsRelations = relations(platformsTable, ({ many }) => ({
  games: many(gamesTable),
}));

export const gamesRelations = relations(gamesTable, ({ one }) => ({
  platform: one(platformsTable, {
    fields: [gamesTable.platformId],
    references: [platformsTable.id],
  }),
}));
