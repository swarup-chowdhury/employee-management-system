# Hosting EMS Permanently on Windows

This option keeps the exact JSP, Jakarta Servlet, JDBC, MySQL, and Tomcat implementation. The Windows PC must remain powered on, connected to the internet, and running MySQL and Tomcat.

## 1. Install prerequisites

Install:

- JDK 21 and confirm `javac -version` works.
- Maven 3.9+ and confirm `mvn -version` works.
- MySQL Server 8 and MySQL command-line tools.
- Apache Tomcat 10.1.x.

Set `JAVA_HOME`, `CATALINA_HOME`, and add Java, Maven, MySQL, and Tomcat `bin` folders to PATH. Restart PowerShell after changing PATH.

## 2. Open the project in PowerShell

```powershell
cd C:\path\to\employee-management-system
```

If PowerShell blocks local scripts, allow scripts for the current user:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

## 3. Build and install the application

Use the included setup script. Adjust the paths if your installations are elsewhere:

```powershell
.\setup-ems.ps1 `
  -TomcatHome "C:\apache-tomcat-10.1.55" `
  -MySqlBin "C:\Program Files\MySQL\MySQL Server 8.0\bin"
```

The script imports `database\employee_management.sql`, builds the WAR, and copies it to Tomcat's `webapps` folder.

## 4. Start the website

```powershell
.\run-ems.ps1 -TomcatHome "C:\apache-tomcat-10.1.55"
```

Open:

`http://localhost:8080/employee-management-system/login`

Development login:

```text
Username: admin
Password: Admin@123
```

Change the development password/hash before real use.

## 5. Access from another device on the same network

Find the PC's local IPv4 address with:

```powershell
ipconfig
```

Allow Tomcat through Windows Firewall for private networks, then open:

`http://YOUR-PC-IP:8080/employee-management-system/login`

Example:

`http://192.168.1.25:8080/employee-management-system/login`

Do not expose MySQL port 3306 to the network. The application should connect to MySQL locally.

## 6. Public internet access

For public access, you need a domain or tunnel and a stable secure HTTPS endpoint. The safer options are:

- Cloudflare Tunnel, with no inbound router port forwarding.
- A reverse proxy such as Caddy or Nginx with HTTPS.
- Router port forwarding only when you understand the security implications.

Do not expose the Tomcat manager, MySQL, or administrative database ports publicly. Use HTTPS, a strong admin password, Windows updates, backups, and a firewall. A home PC is not as reliable as managed hosting: sleep mode, power loss, ISP changes, and router restarts can take the site offline.

## 7. Troubleshooting

- **404:** Confirm the WAR is in Tomcat `webapps` and the context URL includes `/employee-management-system`.
- **Port 8080 already in use:** Change the connector port in `conf\server.xml`, then use the matching `-Port` value in `run-ems.ps1`.
- **Database connection error:** Confirm MySQL is running and that the `ems_user` account from the SQL script exists.
- **JSP/Servlet class errors:** Confirm Tomcat 10.1 is used. Tomcat 9 requires converting imports from `jakarta.*` to `javax.*` consistently.
- **PowerShell execution policy:** Run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` once.
