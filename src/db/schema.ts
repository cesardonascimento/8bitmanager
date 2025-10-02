import { relations, sql } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export type GameListContentItem = {
  id: string;
  title: string;
  titleNormalized: string;
  releasedGameId: string;
  releasedGameCandidates: string[];
};

export type GameOrigin = 'seed' | 'import' | 'manual';

export const platformsTable = sqliteTable('platforms', {
  id: text().primaryKey(),
  createdAt: integer('createdAt', { mode: 'timestamp' })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer('updatedAt', { mode: 'timestamp' })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`)
    .$onUpdate(() => new Date()),
  collectionGamesCount: integer('collectionGamesCount').notNull().default(0),
  company: text(),
  name: text().notNull(),
  releasedGamesCount: integer('releasedGamesCount').notNull().default(0),
});

export const gamesTable = sqliteTable('games', {
  id: text()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  createdAt: integer('createdAt', { mode: 'timestamp' })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer('updatedAt', { mode: 'timestamp' })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`)
    .$onUpdate(() => new Date()),
  platformId: text().notNull(),
  inCollection: integer('inCollection', { mode: 'boolean' })
    .notNull()
    .default(false),
  origin: text().$type<GameOrigin>().notNull().default('seed'),
  title: text().notNull(),
  titleVariants: text({ mode: 'json' })
    .$type<string[]>()
    .notNull()
    .default(sql`'[]'`),
  titleNormalized: text().notNull(),
});

export const gameListsTable = sqliteTable('game_lists', {
  id: text()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  createdAt: integer('createdAt', { mode: 'timestamp' })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer('updatedAt', { mode: 'timestamp' })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`)
    .$onUpdate(() => new Date()),
  platformId: text().notNull(),
  content: text({ mode: 'json' })
    .$type<Record<string, GameListContentItem>>()
    .notNull()
    .default(sql`'{}'`),
  gamesCount: integer('gamesCount').notNull().default(0),
  foundGamesCount: integer('foundGamesCount').notNull().default(0),
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
