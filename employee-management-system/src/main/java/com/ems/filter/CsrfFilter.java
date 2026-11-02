package com.ems.filter;

import jakarta.servlet.*;
import jakarta.servlet.http.*;
import java.io.IOException;
import java.security.SecureRandom;
import java.util.Base64;

public class CsrfFilter implements Filter {
    private static final String TOKEN = "csrfToken";
    private final SecureRandom random = new SecureRandom();

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;
        HttpSession session = req.getSession(false);
        if (session == null || session.getAttribute("adminUser") == null) {
            res.sendError(HttpServletResponse.SC_FORBIDDEN);
            return;
        }
        String token = (String) session.getAttribute(TOKEN);
        if (token == null) {
            token = newToken();
            session.setAttribute(TOKEN, token);
        }
        if ("POST".equalsIgnoreCase(req.getMethod())) {
            String submitted = req.getParameter(TOKEN);
            if (submitted == null || !token.equals(submitted)) {
                res.sendError(HttpServletResponse.SC_FORBIDDEN, "Request could not be verified.");
                return;
            }
        }
        req.setAttribute(TOKEN, token);
        chain.doFilter(request, response);
    }

    private String newToken() {
        byte[] bytes = new byte[32];
        random.nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }
}
