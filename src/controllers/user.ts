import { eq } from "drizzle-orm";
import { BaseController } from "./base";
import { users, type User, type NewUser } from "../models";

type UserController = BaseController & {
    findByEmail: (email: string) => Promise<User | undefined>;
};

export const createUserController = (db: typeof import("../db").db) => {
  async function findAll(): Promise<User[]> {
    const usersResult: User[] = await db.select().from(users);
    return usersResult;
  };

  async function findById(id: string) {
    const userResult = await db.query.users.findFirst({
      where: eq(users.id, id),
    });

    return userResult;
  };

  return {
    findAll,
    find: async () => {
      const usersResult: User[] = await db.query.users.findMany({

      });
      return usersResult;
    },
    findById,
    create: async (data: NewUser) => {
      const [createdUser] = await db.insert(users).values(data).returning();
      return createdUser;
    },
    update: async (id: string, data: Partial<User>) => {
      const [updatedUser] = await db
        .update(users)
        .set(data)
        .where(eq(users.id, id))
        .returning();
      return updatedUser;
    },
    delete: async (id: string) => {
      await db.delete(users).where(eq(users.id, id));
    },
    findByEmail: async (email: string) => {
      const userResult = await db.query.users.findFirst({
        where: eq(users.email, email),
      });

      return userResult;
    }
  } satisfies UserController;
};
