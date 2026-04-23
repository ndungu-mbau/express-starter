import { pgTable, text, uuid, boolean } from "drizzle-orm/pg-core"
import { relations } from 'drizzle-orm'

export const users = pgTable('users', {
    id: uuid().defaultRandom().primaryKey(),
    name: text(),
    email: text()
})

export const todos = pgTable("todos", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  completed: boolean("completed").notNull().default(false),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
})

export const usersRelations = relations(users, ({ many }) => ({
  todos: many(todos),
}));

export const todosRelations = relations(todos, ({ one }) => ({
  user: one(users, {
    fields: [todos.userId],
    references: [users.id],
  }),
}));