import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { createAccount, createEmployee, deleteEmployee, employeeStats, getUserByUsername, listEmployees, updateEmployee } from "./db";
import { createAdminSession, hashPassword, readCookie, removeAdminSession, sessionCookieName, verifyPassword } from "./customAuth";

const employeeInput = z.object({ fullName: z.string().trim().min(2).max(120), email: z.string().email().max(160), phone: z.string().trim().min(5).max(30), department: z.string().min(1).max(80), designation: z.string().trim().min(2).max(100), salary: z.string().regex(/^\d+(\.\d{1,2})?$/), joiningDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), employmentStatus: z.enum(["Active", "On Leave", "Inactive"]), address: z.string().max(500).optional() });
const accountInput = z.object({ adminName: z.string().trim().min(2).max(80), username: z.string().trim().min(3).max(40).regex(/^[a-zA-Z0-9_.-]+$/), password: z.string().min(6).max(120) });
const loginInput = z.object({ username: z.string().trim().min(3).max(40), password: z.string().min(6).max(120) });

function setSession(ctx: any, user: any) {
  const token = createAdminSession(user);
  ctx.res.cookie(sessionCookieName(), token, { httpOnly: true, sameSite: "none", secure: true, maxAge: 8 * 60 * 60 * 1000, path: "/" });
  return { success: true } as const;
}

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(o => {
      if (!o.ctx.user) return null;
      const { passwordHash: _passwordHash, ...safeUser } = o.ctx.user;
      return safeUser;
    }),
    register: publicProcedure.input(accountInput).mutation(async ({ input, ctx }) => {
      const username = input.username.toLowerCase();
      if (await getUserByUsername(username)) throw new Error("That username is already registered");
      const user = await createAccount(input.adminName, username, hashPassword(input.password));
      return setSession(ctx, user);
    }),
    login: publicProcedure.input(loginInput).mutation(async ({ input, ctx }) => {
      const user = await getUserByUsername(input.username.toLowerCase());
      if (!user?.passwordHash || !verifyPassword(input.password, user.passwordHash)) throw new Error("Invalid username or password");
      return setSession(ctx, { ...user, lastSignedIn: new Date() });
    }),
    logout: publicProcedure.mutation(({ ctx }) => {
      removeAdminSession(readCookie(ctx.req.headers.cookie, sessionCookieName()));
      ctx.res.clearCookie(sessionCookieName(), { httpOnly: true, sameSite: "none", secure: true, path: "/" });
      ctx.res.clearCookie(COOKIE_NAME, { ...getSessionCookieOptions(ctx.req), maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  employee: router({
    stats: protectedProcedure.query(({ ctx }) => employeeStats(ctx.user.id)),
    list: protectedProcedure.input(z.object({ search: z.string().optional(), department: z.string().optional(), status: z.string().optional() })).query(({ input, ctx }) => listEmployees(ctx.user.id, input.search, input.department, input.status)),
    create: protectedProcedure.input(employeeInput).mutation(({ input, ctx }) => createEmployee(ctx.user.id, input)),
    update: protectedProcedure.input(employeeInput.extend({ id: z.number() })).mutation(({ input, ctx }) => { const { id, ...data } = input; return updateEmployee(ctx.user.id, id, data); }),
    remove: protectedProcedure.input(z.object({ id: z.number() })).mutation(({ input, ctx }) => deleteEmployee(ctx.user.id, input.id)),
  }),
});
export type AppRouter = typeof appRouter;
