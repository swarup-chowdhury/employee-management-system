# AIP mapping for the managed deployment

The original project remains the reference JSP/Servlet/JDBC/Tomcat implementation. The managed site ports the same behavior to React/Express/tRPC/Drizzle so it can run on permanent managed hosting.

| Original AIP concept | Managed implementation |
|---|---|
| JSP views | React page components and reusable form/table markup |
| Servlet controllers | Authenticated tRPC procedures in `server/routers.ts` |
| JDBC DAO classes | Drizzle/MySQL queries in `server/db.ts` |
| HttpSession | Custom `ems_admin_session` cookie session via registration/login mutations and protected procedures |
| PreparedStatement | Drizzle parameterized query builder |
| ResultSet | Typed database query results |
| CRUD forms | Client forms with zod-backed server validation |
| sendRedirect/RequestDispatcher | React route state and authenticated query/mutation transitions |
| MySQL schema | Drizzle schema in `drizzle/schema.ts` |
| Tomcat deployment | Managed server container deployment |

The permanent website starts with account creation. A user enters an Admin Name, Username, Password, and confirmation; the server stores a salted scrypt password hash and creates a private workspace. Every employee row carries an `ownerId`, and every list, statistics, update, and delete query is filtered by the authenticated account. This is logical per-user database isolation: users receive the same private behavior as separate databases without the operational cost of creating and backing up a physical database for every account. For the university viva, explain that the permanent website is the hosted migration, while the downloadable WAR remains the exact syllabus-aligned implementation.
