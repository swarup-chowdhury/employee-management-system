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
export function getAdminSession(token?: string) { return token ? sessions.get(token) : undefined; }
export function removeAdminSession(token?: string) { if (token) sessions.delete(token); }
export function sessionUser(name: string, username: string): User {
  const now = new Date();
  return { id: 0, openId: `ems:${username}`, name, email: `${username}@ems.local`, loginMethod: "ems-password", role: "admin", createdAt: now, updatedAt: now, lastSignedIn: now };
}
export function readCookie(header: string | undefined, name: string) {
  return header?.split(";").map(v => v.trim()).find(v => v.startsWith(`${name}=`))?.slice(name.length + 1);
}
