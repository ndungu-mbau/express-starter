import { pgTable, text, uuid, timestamp } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

export const users = pgTable('users', {
    id: uuid().defaultRandom().primaryKey(),
    name: text(),
    email: text(),
    hashedPassword: text().notNull(),
    createdAt: timestamp().notNull().defaultNow(),
})

export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(), // random token, used as cookie value
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const todos = pgTable("todos", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description"),
  completed: text("completed").notNull().default("false"),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
})

export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
  todos: many(todos),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const todosRelations = relations(todos, ({ one }) => ({
  user: one(users, {
    fields: [todos.userId],
    references: [users.id],
  }),
}));

export type User = typeof users.$inferSelect;
export type Session = typeof sessions.$inferSelect;
export type Todo = typeof todos.$inferSelect;
