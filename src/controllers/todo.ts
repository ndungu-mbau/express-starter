import { eq } from "drizzle-orm";
import { Todo, todos } from "../models";

import { CreateTodoInput } from '../validators'

import type { BaseController } from "./base-controller";

type TodoController = BaseController

export const createTodoController = (db: typeof import("../db").db) => {
  const todoController = {
    findAll: async () => {
      const todosResult = await db.query.todos.findMany();
      return todosResult;
    },
    find: async (query: any, userId: string) => {
      const todosResult = await db.query.todos.findMany({
        where: eq(todos.userId, userId),
      });
      return todosResult;
    },
    findById: async (id: string) => {
      const todoResult = await db.query.todos.findFirst({
        where: eq(todos.id, id),
      });
      return todoResult;
    },
    create: async (obj: CreateTodoInput, userId: string) => {
      const newTodo = await db.insert(todos).values({ ...obj, userId }).returning();
      return newTodo;
    },
    update: async (id: string, obj: Partial<Todo>) => {
      const updatedTodo = await db
        .update(todos)
        .set(obj)
        .where(eq(todos.id, id))
        .returning();
      return updatedTodo;
    },
    delete: async (id: string) => {
      const deletedTodo = await db
        .delete(todos)
        .where(eq(todos.id, id))
        .returning();
      return deletedTodo;
    }
  } satisfies TodoController;

  return todoController;
};
