import { Router } from "express";
import { eq } from "drizzle-orm";
import { processRequestBody } from "zod-express-middleware";
import { db } from "../../db";
import { sessions, users } from "../../models";
import {
  hashPassword,
  verifyPassword,
  generateSessionId,
  sessionExpiresAt,
} from "../../lib/auth";
import { SESSION_COOKIE, requireAuth } from "../../lib/middleware/auth";
import { loginSchema, registerSchema } from "../../validators/auth-validators";

const authRouter = Router();

const COOKIE_OPTIONS = {
  httpOnly: true, // not accessible via JS
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

// POST /auth/register
authRouter.post(
  "/register",
  processRequestBody(registerSchema),
  async (req, res) => {
    const { name, email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }

    const existing = await db.query.users.findFirst({
      where: eq(users.email, email.toLowerCase()),
    });

    if (existing) {
      res.status(409).json({ error: "Email already in use" });
      return;
    }

    const hashedPassword = await hashPassword(password);

    const [user] = await db
      .insert(users)
      .values({ name, email: email.toLowerCase(), hashedPassword })
      .returning();

    console.log("Registered user:", user);

    // Create a session immediately after registration
    const sessionId = generateSessionId();
    await db.insert(sessions).values({
      id: sessionId,
      userId: user.id,
      expiresAt: sessionExpiresAt(),
    });

    res
      .cookie(SESSION_COOKIE, sessionId, COOKIE_OPTIONS)
      .status(201)
      .json({ user: { id: user.id, email: user.email } });
  },
);

// POST /auth/login
authRouter.post("/login", processRequestBody(loginSchema), async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required" });
    return;
  }

  const user = await db.query.users.findFirst({
    where: eq(users.email, email.toLowerCase()),
  });

  if(!user) {
    res.status(401).json({ error: "Invalid email or password" });
    return;
  }

  // Always run bcrypt compare to prevent timing attacks
  const passwordMatch = await verifyPassword(password, user.hashedPassword)

  if (!passwordMatch) {
    res.status(401).json({ error: "Invalid email or password" });
    return;
  }

  const sessionId = generateSessionId();
  await db.insert(sessions).values({
    id: sessionId,
    userId: user.id,
    expiresAt: sessionExpiresAt(),
  });

  res
    .cookie(SESSION_COOKIE, sessionId, COOKIE_OPTIONS)
    .json({ user: { id: user.id, email: user.email } });
});

// POST /auth/logout
authRouter.post("/logout", async (req, res) => {
  const sessionId = req.cookies?.[SESSION_COOKIE];

  if (sessionId) {
    await db.delete(sessions).where(eq(sessions.id, sessionId));
  }

  res
    .clearCookie(SESSION_COOKIE, COOKIE_OPTIONS)
    .json({ message: "Logged out" });
});

// GET /auth/me  (protected)
authRouter.get("/me", requireAuth, (req, res) => {
  const { id, email, createdAt } = req.user!;
  res.json({ user: { id, email, createdAt } });
});

export { authRouter };
