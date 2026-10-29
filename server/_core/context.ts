import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import type { User } from "../../drizzle/schema";
import { sdk } from "./sdk";
import { getAdminSession, readCookie, sessionCookieName } from "../customAuth";

export type TrpcContext = { req: CreateExpressContextOptions["req"]; res: CreateExpressContextOptions["res"]; user: User | null };

export async function createContext(opts: CreateExpressContextOptions): Promise<TrpcContext> {
  const customUser = getAdminSession(readCookie(opts.req.headers.cookie, sessionCookieName()));
  if (customUser) return { req: opts.req, res: opts.res, user: customUser };
  let user: User | null = null;
  try { user = await sdk.authenticateRequest(opts.req); } catch { user = null; }
  return { req: opts.req, res: opts.res, user };
}
