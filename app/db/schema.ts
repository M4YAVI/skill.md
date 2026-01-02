import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const manifestoItems = pgTable('manifesto_items', {
    id: serial('id').primaryKey(),
    label: text('label').notNull(),
    category: text('category').notNull(),
    skill: text('skill').default('').notNull(),
    views: integer('views').default(0).notNull(),
    copies: integer('copies').default(0).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type ManifestoItem = typeof manifestoItems.$inferSelect;
export type NewManifestoItem = typeof manifestoItems.$inferInsert;
