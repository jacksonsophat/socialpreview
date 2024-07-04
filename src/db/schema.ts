import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const contact = pgTable('social_preview_contact', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    message: text('message').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
});