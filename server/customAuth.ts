import crypto from "node:crypto";
import type { User } from "../drizzle/schema";

const sessions = new Map<string, User>();
const COOKIE = "ems_admin_session";

export function sessionCookieName() { return COOKIE; }

export function createAdminSession(user: User) {
  const token = crypto.randomBytes(32).toString("hex");
  sessions.set(token, user);
  return token;
}

export function getAdminSession(token?: string) {
  return token ? sessions.get(token) : undefined;
}

export function removeAdminSession(token?: string) {
  if (token) sessions.delete(token);
}

export function hashPassword(password: string) {
  const salt = crypto.randomBytes(16).toString("hex");
  const derived = crypto.scryptSync(password, salt, 64).toString("hex");
  return `scrypt:${salt}:${derived}`;
}

export function verifyPassword(password: string, encoded: string) {
  const [algorithm, salt, stored] = encoded.split(":");
  if (algorithm !== "scrypt" || !salt || !stored) return false;
  const derived = crypto.scryptSync(password, salt, 64).toString("hex");
  const a = Buffer.from(stored, "hex");
  const b = Buffer.from(derived, "hex");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export function readCookie(header: string | undefined, name: string) {
  return header?.split(";").map(v => v.trim()).find(v => v.startsWith(`${name}=`))?.slice(name.length + 1);
}
