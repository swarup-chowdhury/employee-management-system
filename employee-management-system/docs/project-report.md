# Employee Management System — Project Report

## Abstract

The Employee Management System is a dynamic administrative web application developed using JSP, Jakarta Servlets, JDBC, MySQL, HTML5, CSS3, and JavaScript. It gives an authorized administrator a secure interface for maintaining employee records.

## Objectives

The project demonstrates HTML forms, JSP views, servlet request handling, MVC architecture, JDBC connectivity, prepared statements, session management, server-side validation, CRUD operations, and deployment on Apache Tomcat.

## Modules

1. Authentication and session management.
2. Dashboard statistics from live database records.
3. Employee creation and validation.
4. Employee directory with search and filters.
5. Employee update and deletion.
6. Database schema and development setup documentation.

## Methodology

The implementation separates models, DAO database operations, servlet controllers, security filters, and JSP views. Input is validated at the server before persistence. State-changing requests use POST and CSRF tokens. JDBC resources are closed with try-with-resources.

## Outcome

The final WAR deploys on Tomcat 10.1 and uses MySQL-compatible SQL. The application was verified with Maven compilation, Tomcat deployment, login, dashboard retrieval, employee creation, directory search, and protected deletion tests.

## Limitations and future improvements

Future versions could add role-based access, pagination, audit history, file-based profile images, automated JUnit/integration tests, a connection pool, and HTTPS deployment hardening.
