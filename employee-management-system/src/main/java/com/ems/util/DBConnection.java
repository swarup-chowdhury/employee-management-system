package com.ems.util;
import java.io.IOException; import java.io.InputStream; import java.sql.*; import java.util.Properties;
 public final class DBConnection { private static final Properties P=new Properties(); static { try { Class.forName("com.mysql.cj.jdbc.Driver"); try(InputStream in=DBConnection.class.getClassLoader().getResourceAsStream("application.properties")){ if(in!=null) P.load(in); } } catch(IOException | ClassNotFoundException e){ throw new ExceptionInInitializerError(e); } }
 private DBConnection(){} private static String value(String key,String env,String fallback){String v=System.getenv(env); if(v!=null&&!v.isBlank()) return v; return P.getProperty(key,fallback);}
 public static Connection getConnection() throws SQLException { return DriverManager.getConnection(value("db.url","EMS_DB_URL","jdbc:mysql://localhost:3306/employee_management?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true"),value("db.username","EMS_DB_USERNAME","ems_user"),value("db.password","EMS_DB_PASSWORD","change_me")); }
}
