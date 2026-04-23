import { RequestHandler } from "express";
import { eq, and, gt } from "drizzle-orm";
import { db } from "../../db";
import { sessions, users, type User } from "../../models";

// Augment Express's Request type
declare global {
  namespace Express {
    interface Request {
      user?: User;
      sessionId?: string;
    }
  }
}

export const SESSION_COOKIE = "session_id";

export const sessionMiddleware: RequestHandler = async (req, _res, next) => {
  const sessionId = req.cookies?.[SESSION_COOKIE];

  if (!sessionId) return next();

  try {
    const session = await db.query.sessions.findFirst({
      where: and(
        eq(sessions.id, sessionId),
        gt(sessions.expiresAt, new Date()) // not expired
      )
    });

    if(!session) {
      return next();
    }

    const user = await db.query.users.findFirst({
      where: eq(users.id, session.userId)
    });

    if (user) {
      req.user = user;
      req.sessionId = sessionId;
    }
  } catch (err) {
    console.error("Session lookup failed:", err);
  }

  next();
};

// Guard for protected routes
export const requireAuth: RequestHandler = (req, res, next) => {
  if (!req.user && !req.sessionId) {
    res.status(401).json({ error: "Unauthenticated" });
    return;
  }
  next();
};