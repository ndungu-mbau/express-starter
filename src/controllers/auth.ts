import { eq } from "drizzle-orm";
import { db } from "../db";
import { sessions, users } from "../models";
import { hashPassword, verifyPassword, generateSessionId, sessionExpiresAt } from "../lib/auth";

export const authRendererController = {
  login: async (email: string, password: string) => {
    const user = await db.query.users.findFirst({
      where: eq(users.email, email.toLowerCase()),
    });

    if (!user) {
      return { error: "Invalid email or password" };
    }

    const passwordMatch = await verifyPassword(password, user.hashedPassword);

    if (!passwordMatch) {
      return { error: "Invalid email or password" };
    }

    const sessionId = generateSessionId();
    await db.insert(sessions).values({
      id: sessionId,
      userId: user.id,
      expiresAt: sessionExpiresAt(),
    });

    return { sessionId };
  },

  register: async (name: string, email: string, password: string) => {
    const existing = await db.query.users.findFirst({
      where: eq(users.email, email.toLowerCase()),
    });

    if (existing) {
      return { error: "Email already in use" };
    }

    const hashedPassword = await hashPassword(password);

    const [user] = await db
      .insert(users)
      .values({ name, email: email.toLowerCase(), hashedPassword })
      .returning();

    const sessionId = generateSessionId();
    await db.insert(sessions).values({
      id: sessionId,
      userId: user.id,
      expiresAt: sessionExpiresAt(),
    });

    return { sessionId };
  },

  logout: async (sessionId: string) => {
    if (sessionId) {
      await db.delete(sessions).where(eq(sessions.id, sessionId));
    }
  },
};