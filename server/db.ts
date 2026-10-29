import { and, count, desc, eq, like, or, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { employees, InsertEmployee, users } from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;
export async function getDb() { if (!_db && process.env.DATABASE_URL) _db = drizzle(process.env.DATABASE_URL); return _db; }
export async function upsertUser(user: any): Promise<void> { const db=await getDb(); if(!db) throw new Error("Database unavailable"); await db.insert(users).values(user).onDuplicateKeyUpdate({set:{name:user.name,email:user.email,lastSignedIn:new Date()}}); }
export async function getUserByOpenId(openId: string) { const db=await getDb(); if(!db)return undefined; const r=await db.select().from(users).where(eq(users.openId,openId)).limit(1); return r[0]; }
export async function listEmployees(search="", department="", status="") { const db=await getDb(); if(!db) throw new Error("Database unavailable"); const terms=[]; if(search) terms.push(or(like(employees.fullName,`%${search}%`),like(employees.email,`%${search}%`),like(sql`CAST(${employees.id} AS CHAR)`,`%${search}%`))); if(department) terms.push(eq(employees.department,department)); if(status) terms.push(eq(employees.employmentStatus,status as any)); return db.select().from(employees).where(terms.length?and(...terms):undefined).orderBy(desc(employees.createdAt)); }
export async function employeeStats(){const db=await getDb();if(!db)throw new Error("Database unavailable");const [total]=await db.select({value:count()}).from(employees);const [active]=await db.select({value:count()}).from(employees).where(eq(employees.employmentStatus,"Active"));const [departments]=await db.select({value:sql<number>`count(distinct ${employees.department})`}).from(employees);const [recent]=await db.select({value:count()}).from(employees).where(sql`${employees.createdAt} >= DATE_SUB(CURRENT_TIMESTAMP, INTERVAL 30 DAY)`);return {total:Number(total.value),active:Number(active.value),departments:Number(departments.value),recent:Number(recent.value)};}
export async function createEmployee(input: InsertEmployee){const db=await getDb();if(!db)throw new Error("Database unavailable");return db.insert(employees).values(input);}
export async function updateEmployee(id:number,input:Partial<InsertEmployee>){const db=await getDb();if(!db)throw new Error("Database unavailable");return db.update(employees).set(input).where(eq(employees.id,id));}
export async function deleteEmployee(id:number){const db=await getDb();if(!db)throw new Error("Database unavailable");return db.delete(employees).where(eq(employees.id,id));}
