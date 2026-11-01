# PeopleHub managed deployment plan

## Implementation

Port the existing EMS experience to the managed React/Express/tRPC/MySQL runtime while preserving the dashboard visual system, administrator access, live employee statistics, employee CRUD, search, department/status filters, validation, confirmations, and responsive behavior. Use the custom EMS administrator login and the managed MySQL database for employees. Document how the managed routes map to the original AIP MVC concepts.

## Design

Design movement: calm enterprise operations console.
Core principles: high-signal hierarchy, quiet navy navigation, action-first tables, and responsive clarity.
Color philosophy: navy communicates trust, blue marks actions, and soft neutral surfaces keep employee data readable.
Layout paradigm: persistent left rail with a spacious operational canvas rather than a centered marketing grid.
Signature elements: EMS gradient mark, compact status pills, and small icon-led metric cards.
Interaction philosophy: fast filters, obvious primary actions, restrained confirmation for destructive work.
Typography system: system sans with strong compact headings and generous table readability.
Brand essence: a people-operations console for administrators who need accurate employee records quickly; clear, dependable, practical.
Brand voice: direct and supportive. Examples: “Keep your people data organized.” “Employee record saved successfully.”
Wordmark: compact EMS monogram in a rounded gradient tile beside PeopleHub.
Signature brand color: PeopleHub action blue #3975EE.

## Structure

- `client/src/pages/Home.tsx`: login state, dashboard, directory, filters, forms, CRUD interactions.
- `client/src/index.css`: responsive enterprise visual system.
- `server/routers.ts`: authenticated employee procedures.
- `server/db.ts`: MySQL queries and live statistics.
- `drizzle/schema.ts`: users and employee tables.
- `docs/aip-mapping.md`: viva mapping from original JSP/Servlet/MVC concepts to hosted routes.
