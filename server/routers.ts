import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { createEmployee, deleteEmployee, employeeStats, listEmployees, updateEmployee } from "./db";

const employeeInput=z.object({fullName:z.string().trim().min(2).max(120),email:z.string().email().max(160),phone:z.string().trim().min(5).max(30),department:z.string().min(1).max(80),designation:z.string().trim().min(2).max(100),salary:z.string().regex(/^\d+(\.\d{1,2})?$/),joiningDate:z.string().regex(/^\d{4}-\d{2}-\d{2}$/),employmentStatus:z.enum(["Active","On Leave","Inactive"]),address:z.string().max(500).optional()});
export const appRouter=router({system:systemRouter,auth:router({me:publicProcedure.query(o=>o.ctx.user),logout:publicProcedure.mutation(({ctx})=>{ctx.res.clearCookie(COOKIE_NAME,{...getSessionCookieOptions(ctx.req),maxAge:-1});return {success:true} as const;})}),employee:router({stats:protectedProcedure.query(()=>employeeStats()),list:protectedProcedure.input(z.object({search:z.string().optional(),department:z.string().optional(),status:z.string().optional()})).query(({input})=>listEmployees(input.search,input.department,input.status)),create:protectedProcedure.input(employeeInput).mutation(({input})=>createEmployee(input)),update:protectedProcedure.input(employeeInput.extend({id:z.number()})).mutation(({input})=>{const {id,...data}=input;return updateEmployee(id,data);}),remove:protectedProcedure.input(z.object({id:z.number()})).mutation(({input})=>deleteEmployee(input.id))})});
export type AppRouter=typeof appRouter;
