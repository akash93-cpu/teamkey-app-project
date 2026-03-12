package com.teamkeys.java_app.jwt.filter;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.teamkeys.java_app.jwt.service.ApplicationUserDetailsService;
import com.teamkeys.java_app.jwt.util.JwtUtil;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@Component
public class JwtFilterRequest extends OncePerRequestFilter {
	
	private final ApplicationUserDetailsService detailsService;
	private final JwtUtil jwtUtil;
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
	        throws ServletException, IOException {

	    String username = null;
	    String token = null;

	    // Check Authorization header first
	    final String authHeaderString = request.getHeader("Authorization");
	    if (authHeaderString != null && authHeaderString.startsWith("Bearer ")) {
	        token = authHeaderString.substring(7);
	        username = jwtUtil.extractUsername(token);
	    }

	    // Fall back to cookie if no Authorization header
	    if (token == null && request.getCookies() != null) {
	        for (Cookie cookie : request.getCookies()) {
	            if ("jwt".equals(cookie.getName())) {
	                token = cookie.getValue();
	                username = jwtUtil.extractUsername(token);
	                break;
	            }
	        }
	    }

	    if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
	        UserDetails userDetails = this.detailsService.loadUserByUsername(username);

	        if (jwtUtil.validateToken(token, userDetails)) {
	            var authToken = new UsernamePasswordAuthenticationToken(
	                userDetails, null, userDetails.getAuthorities());
	            authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
	            SecurityContextHolder.getContext().setAuthentication(authToken);
	        }
	    }

	    chain.doFilter(request, response);
	}
	
}
