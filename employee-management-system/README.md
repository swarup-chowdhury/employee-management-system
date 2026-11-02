# Employee Management System

A complete MCA Advanced Internet Programming project using JSP, Jakarta Servlets, JDBC, MySQL, Maven and Apache Tomcat 10.1.

## Requirements

- JDK 21 (including `javac`)
- Maven 3.9+
- Apache Tomcat 10.1+
- MySQL 8+

## Windows setup

Open PowerShell in the project directory. Confirm `java -version`, `javac -version`, `mvn -version`, and `mysql --version` work. Import the database:

```powershell
mysql -u root -p < database\employee_management.sql
```

Set database variables for the current PowerShell session:

```powershell
$env:EMS_DB_URL="jdbc:mysql://localhost:3306/employee_management?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true"
$env:EMS_DB_USERNAME="ems_user"
$env:EMS_DB_PASSWORD="change_me"
```

Build the WAR:

```powershell
mvn clean package
```

Copy `target\employee-management-system.war` into Tomcat's `webapps` folder, start Tomcat with `bin\startup.bat`, then open:

`http://localhost:8080/employee-management-system/login`

Development login: `admin` / `Admin@123`. Change the development password/hash before any real deployment.

## Architecture

Servlet controllers handle requests, DAO classes contain JDBC operations, model classes represent data, filters protect authenticated routes, and JSP files render the views. All user SQL values are passed through `PreparedStatement`.

## Security notes

This is an educational project. It includes BCrypt password verification, server-side validation, session timeout, HTTP-only session cookies, protected routes, prepared statements, and generic error messages. Before production use, add HTTPS, a robust CSRF token implementation, externalized secrets, audit logging, stronger authorization, and security testing.

## Testing checklist

1. Valid login reaches dashboard.
2. Invalid login stays on login page.
3. Direct dashboard access redirects to login without a session.
4. Add valid employee and verify it appears in directory.
5. Submit missing fields and verify validation.
6. Submit duplicate email and verify a friendly error.
7. Search by name, ID, or email.
8. Filter by department and status.
9. Edit an employee and verify updated values.
10. Delete an employee after confirmation.
11. Use invalid employee ID and verify graceful handling.
12. Logout and confirm protected pages redirect to login.
13. Stop MySQL and verify a generic database error is shown.
14. Resize the browser to verify mobile layout.


## Permanent Windows hosting

For running this exact Java/Tomcat project continuously on a Windows PC, see [README-WINDOWS-HOSTING.md](README-WINDOWS-HOSTING.md). The included `setup-ems.ps1` and `run-ems.ps1` scripts automate database import, Maven packaging, WAR deployment, and Tomcat startup.
