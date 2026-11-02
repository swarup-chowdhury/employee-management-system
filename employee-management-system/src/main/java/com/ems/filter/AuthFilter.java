package com.ems.filter;
import jakarta.servlet.*; import jakarta.servlet.http.*; import java.io.IOException;
public class AuthFilter implements Filter { public void doFilter(ServletRequest req,ServletResponse res,FilterChain chain)throws IOException,ServletException{HttpServletRequest r=(HttpServletRequest)req;HttpServletResponse s=(HttpServletResponse)res;if(r.getSession(false)==null||r.getSession(false).getAttribute("adminUser")==null){s.sendRedirect(r.getContextPath()+"/login");return;}chain.doFilter(req,res);} }
