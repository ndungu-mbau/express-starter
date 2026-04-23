import { eq } from "drizzle-orm";
import { users } from "../models";

import { User, CreateUserInput } from '../validators'

import type { BaseController } from "./base-controller";

type UserController = Omit<BaseController & {
  findUserByEmail: (email: string) => Promise<any>;
}, "create">;

export const createUserController = (db: typeof import("../db").db) => {
  const userController = {
    findAll: async () => {
      const usersResult = await db.query.users.findMany({
        with: {
          todos: true,
        }
      });
      return usersResult;
    },
    find: async (query: any) => {
      const usersResult = await db.select().from(users).where(query);
      return usersResult;
    },
    findById: async (id: string) => {
      const userResult = await db.query.users.findFirst({
        where: eq(users.id, id),
      });

      return userResult;
    },
    update: async (id: string, obj: Partial<User>) => {
      const updatedUser = await db
        .update(users)
        .set(obj)
        .where(eq(users.id, id))
        .returning();
      return updatedUser;
    },
    delete: async (id: string) => {
      const deletedUser = await db
        .delete(users)
        .where(eq(users.id, id))
        .returning();
      return deletedUser;
    },
    findUserByEmail(email: string) {
      return db.query.users.findFirst({ where: eq(users.email, email) });
    },
  } satisfies UserController;

  return userController;
};
