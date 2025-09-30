import { relations, sql } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const platformsTable = sqliteTable('platforms', {
  id: text().primaryKey(),
  company: text(),
  name: text().notNull(),
});

export const gamesTable = sqliteTable('games', {
  id: text()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  platformId: text().notNull(),
  inCollection: integer('inCollection', { mode: 'boolean' })
    .notNull()
    .default(false),
  title: text().notNull(),
  titleVariants: text(),
  titleNormalized: text().notNull(),
});

export const gameListsTable = sqliteTable('game_lists', {
  id: text()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  platformId: text().notNull(),
  content: text({ mode: 'json' }).notNull().default('{}'),
  gamesCount: integer('gamesCount').notNull().default(0),
  uploadedAt: integer('uploadedAt', { mode: 'timestamp' })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const platformsRelations = relations(platformsTable, ({ many }) => ({
  games: many(gamesTable),
  gameLists: many(gameListsTable),
}));

export const gamesRelations = relations(gamesTable, ({ one }) => ({
  platform: one(platformsTable, {
    fields: [gamesTable.platformId],
    references: [platformsTable.id],
  }),
}));

export const gameListsRelations = relations(gameListsTable, ({ one }) => ({
  platform: one(platformsTable, {
    fields: [gameListsTable.platformId],
    references: [platformsTable.id],
  }),
}));
