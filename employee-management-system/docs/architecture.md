# Architecture

The system follows MVC: JSP views -> Servlet controllers -> DAO classes -> JDBC/MySQL. `AuthFilter` protects the dashboard and all employee operations. `DBConnection` reads environment variables so credentials never appear in JSP.

```text
Browser -> JSP form -> Servlet -> InputValidator -> DAO -> PreparedStatement -> MySQL
                                      |                         |
                                      +-> redirect/forward <----+
```
