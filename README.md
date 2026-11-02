# PeopleHub Employee Management System

PeopleHub is an employee administration system built for an MCA Advanced Internet Programming project. It provides a practical dashboard for managing employee records, departments, designations, salaries, joining dates, and employment status.

## Features

- First-visit account registration with Admin Name, Username, Password, and confirmation.
- Returning-user sign in with a secure password hash and session cookie.
- Private per-account employee workspaces: each account can view and modify only its own records.
- Dashboard statistics for total employees, active employees, departments, and recently added records.
- Employee directory with search by name, email, or employee ID.
- Department and employment-status filters.
- Add, edit, and delete employee records.
- Duplicate-email protection and server-side validation.
- Responsive layout for desktop, tablet, and mobile screens.
- Persistent MySQL-compatible database storage with account ownership on employee records.

## Technology

The original submission version uses JSP, Jakarta Servlets, JDBC, MySQL, Maven, and Apache Tomcat 10.1. This repository also contains the hosted web version, which uses React, Express, tRPC, Drizzle ORM, and a managed MySQL-compatible database while preserving the same employee-management workflow.

## Project structure

- `client/` contains the React interface, dashboard, login page, forms, and responsive styles.
- `server/` contains authentication, database access, and employee procedures.
- `drizzle/` contains the database schema and migrations.
- `docs/aip-mapping.md` explains how the hosted implementation maps to JSP, Servlets, JDBC, MVC, sessions, and Tomcat concepts.
- `employee-management-system/` is the original AIP WAR project when included in the submission package.

## Local development

Install Node.js 22 and pnpm 10, then run:

```bash
pnpm install
pnpm db:push
pnpm dev
```

Open `http://localhost:3000` in a browser. For a production build:

```bash
pnpm check
pnpm build
pnpm start
```

On first visit, choose **Create account** and register a workspace. On later visits, choose **Sign in**. Passwords are stored as salted scrypt hashes; plaintext passwords are never saved. The application uses one managed database with owner-scoped records rather than creating a physical database for every account, which provides the same private-workspace behavior while remaining easier to maintain and back up.

## AIP submission notes

The project report and migration notes are included for viva preparation. The original Java project demonstrates the syllabus technologies directly, while the hosted version demonstrates how the same MVC and CRUD concepts can be delivered through a modern web stack.
