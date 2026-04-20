import { pgTable, text, uuid } from "drizzle-orm/pg-core"

export const users = pgTable('users', {
    id: uuid().defaultRandom().primaryKey(),
    name: text(),
    email: text()
})

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert