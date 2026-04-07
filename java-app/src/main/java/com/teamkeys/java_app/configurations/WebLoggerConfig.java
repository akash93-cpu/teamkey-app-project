package com.teamkeys.java_app.configurations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.teamkeys.java_app.logger.LoggingInterceptor;

@Configuration
public class WebLoggerConfig implements WebMvcConfigurer {
	
	@Autowired
	private LoggingInterceptor loggingInterceptor;
	
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		
		registry.addInterceptor(loggingInterceptor);
		
	}

}
