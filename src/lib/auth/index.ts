import bcrypt from "bcrypt";
import crypto from "crypto";

const SALT_ROUNDS = 12;
const SESSION_TTL_MS = 1 * 60 * 60 * 1000; // 1 hour

export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, SALT_ROUNDS);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateSessionId(): string {
  // 32 random bytes → 64-char hex string
  return crypto.randomBytes(32).toString("hex");
}

export function sessionExpiresAt(): Date {
  return new Date(Date.now() + SESSION_TTL_MS);
}