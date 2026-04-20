import { pgTable, integer, text, uuid } from "drizzle-orm/pg-core"

export const users = pgTable('users', {
    id: uuid().defaultRandom().primaryKey(),
    name: text(),
    email: text()
})