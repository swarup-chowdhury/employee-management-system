import { decimal, int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"), email: varchar("email", { length: 320 }), loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("admin").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(), updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(), lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});
export type User = typeof users.$inferSelect; export type InsertUser = typeof users.$inferInsert;

export const employees = mysqlTable("employees", {
  id: int("id").autoincrement().primaryKey(),
  fullName: varchar("fullName", { length: 120 }).notNull(), email: varchar("email", { length: 160 }).notNull().unique(), phone: varchar("phone", { length: 30 }).notNull(),
  department: varchar("department", { length: 80 }).notNull(), designation: varchar("designation", { length: 100 }).notNull(), salary: decimal("salary", { precision: 12, scale: 2 }).notNull(),
  joiningDate: varchar("joiningDate", { length: 10 }).notNull(), employmentStatus: mysqlEnum("employmentStatus", ["Active", "On Leave", "Inactive"]).default("Active").notNull(),
  address: varchar("address", { length: 500 }), createdAt: timestamp("createdAt").defaultNow().notNull(), updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type Employee = typeof employees.$inferSelect; export type InsertEmployee = typeof employees.$inferInsert;
