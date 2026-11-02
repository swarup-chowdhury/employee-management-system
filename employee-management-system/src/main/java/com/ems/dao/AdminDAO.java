package com.ems.dao;
import com.ems.model.Admin; import com.ems.util.DBConnection; import java.sql.*;
public class AdminDAO { public Admin findByUsername(String username) throws SQLException { String sql="SELECT admin_id,username,password_hash FROM admins WHERE username=?"; try(Connection c=DBConnection.getConnection(); PreparedStatement p=c.prepareStatement(sql)){p.setString(1,username); try(ResultSet r=p.executeQuery()){return r.next()?new Admin(r.getLong(1),r.getString(2),r.getString(3)):null;}} } }
