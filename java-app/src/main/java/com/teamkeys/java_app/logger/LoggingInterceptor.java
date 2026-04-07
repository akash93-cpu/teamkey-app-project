package com.teamkeys.java_app.logger;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class LoggingInterceptor  implements HandlerInterceptor {
	
	@Override
	public boolean preHandle(HttpServletRequest req, HttpServletResponse res, Object handle) {
		
		log.info("Request: {} {} from {}", req.getMethod(), req.getRequestURI(), req.getRemoteAddr());
		return true;
		
	}
	
	@Override
	public void afterCompletion(HttpServletRequest req, HttpServletResponse res, Object handle, Exception ex) {
		
		log.info("Completed: {} {} -> status {}", req.getMethod(), req.getRequestURI(), res.getStatus());
		
	}
}
