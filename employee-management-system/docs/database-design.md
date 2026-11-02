# Database Design

## Database

`employee_management` is a MySQL database containing the administrator account and employee records.

## Tables

`admins` stores administrator usernames and BCrypt password hashes. `employees` stores profile, employment, salary, status, and audit timestamps.

## Relationships

There is no direct foreign-key relationship because this version supports a single administrator role managing employee records. The design intentionally avoids unnecessary tables for a semester project.

## Important constraints and indexes

- Primary keys use auto-incrementing `BIGINT` values.
- `admins.username` and `employees.email` are unique.
- Salary cannot be negative at the application validation layer and should also be constrained at the database layer for production hardening.
- Department, status, name, and joining date have indexes for common search and dashboard queries.
- `created_at` and `updated_at` provide record history timestamps.

## ER-style diagram

```text
+------------------+          manages          +--------------------+
| admins           | ------------------------> | employees          |
+------------------+                           +--------------------+
| admin_id PK      |                           | employee_id PK     |
| username UNIQUE  |                           | full_name          |
| password_hash    |                           | email UNIQUE       |
| created_at       |                           | phone              |
+------------------+                           | department         |
                                               | designation        |
                                               | salary             |
                                               | joining_date       |
                                               | employment_status  |
                                               | address            |
                                               | created_at         |
                                               | updated_at         |
                                               +--------------------+
```
