import { and, count, desc, eq, like, or, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { employees, InsertEmployee, users } from "../drizzle/schema";

let _db: ReturnType<typeof drizzle> | null = null;
export async function getDb() { if (!_db && process.env.DATABASE_URL) _db = drizzle(process.env.DATABASE_URL); return _db; }

export async function upsertUser(user: any): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db.insert(users).values(user).onDuplicateKeyUpdate({ set: { name: user.name, email: user.email, lastSignedIn: new Date() } });
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const r = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return r[0];
}

export async function getUserByUsername(username: string) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  const r = await db.select().from(users).where(eq(users.username, username)).limit(1);
  return r[0];
}

export async function createAccount(name: string, username: string, passwordHash: string) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  const email = `${username}@peoplehub.local`;
  const result = await db.insert(users).values({
    openId: `ems:${username}`,
    name,
    email,
    username,
    passwordHash,
    loginMethod: "ems-password",
    role: "admin",
  });
  const id = Number(result[0].insertId);
  const user = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return user[0];
}

function ownerFilter(ownerId: number, search = "", department = "", status = "") {
  const terms = [eq(employees.ownerId, ownerId)];
  if (search) terms.push(or(like(employees.fullName, `%${search}%`), like(employees.email, `%${search}%`), like(sql`CAST(${employees.id} AS CHAR)`, `%${search}%`)) as any);
  if (department) terms.push(eq(employees.department, department));
  if (status) terms.push(eq(employees.employmentStatus, status as any));
  return and(...terms);
}

export async function listEmployees(ownerId: number, search = "", department = "", status = "") {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  return db.select().from(employees).where(ownerFilter(ownerId, search, department, status)).orderBy(desc(employees.createdAt));
}

export async function employeeStats(ownerId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  const [total] = await db.select({ value: count() }).from(employees).where(eq(employees.ownerId, ownerId));
  const [active] = await db.select({ value: count() }).from(employees).where(and(eq(employees.ownerId, ownerId), eq(employees.employmentStatus, "Active")));
  const [departments] = await db.select({ value: sql<number>`count(distinct ${employees.department})` }).from(employees).where(eq(employees.ownerId, ownerId));
  const [recent] = await db.select({ value: count() }).from(employees).where(and(eq(employees.ownerId, ownerId), sql`${employees.createdAt} >= DATE_SUB(CURRENT_TIMESTAMP, INTERVAL 30 DAY)`));
  return { total: Number(total.value), active: Number(active.value), departments: Number(departments.value), recent: Number(recent.value) };
}

export async function createEmployee(ownerId: number, input: InsertEmployee) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  return db.insert(employees).values({ ...input, ownerId });
}

export async function updateEmployee(ownerId: number, id: number, input: Partial<InsertEmployee>) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  return db.update(employees).set(input).where(and(eq(employees.id, id), eq(employees.ownerId, ownerId)));
}

export async function deleteEmployee(ownerId: number, id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  return db.delete(employees).where(and(eq(employees.id, id), eq(employees.ownerId, ownerId)));
}
