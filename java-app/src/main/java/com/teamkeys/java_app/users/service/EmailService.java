package com.teamkeys.java_app.users.service;

import org.hibernate.boot.model.naming.IllegalIdentifierException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class EmailService {
	
	private final JavaMailSender mailSender;
	
	@Async
	public void sendSimpleEmail(String to, String token) {
		try {
			SimpleMailMessage message = new SimpleMailMessage();
			
			message.setTo(to);
			message.setFrom("akash.sonlall99@gmail.com");
			message.setSubject("Please confirm your user email");
            String body = """

                    Hello from Java Spring Team!
                    Please use the following link to verify your email:

                    http://localhost:8080/confirm-token?token=%s
                    
                    Please note -> You have 15 minutes to verify your account once you get this email.
                    """.formatted(token);
            message.setText(body);
            mailSender.send(message);
            
		} catch (Exception e) {
            e.printStackTrace();
            throw new IllegalIdentifierException("Failed to send email");
		}
	}
	
	@Async
	public void sendResetEmail(String to, String token) {
		try {
			SimpleMailMessage message = new SimpleMailMessage();
			
			message.setTo(to);
			message.setFrom("akash.sonlall99@gmail.com");
			message.setSubject("Reset your password - Teamkeys");
			
            String body = """

                    Hello from Java Spring Team!
                    You have requested to reset your password:

                    http://localhost:8080/reset-password?token=%s
                    
                    Please note -> You have 15 minutes to change your password once you get this email.
                    """.formatted(token);
			message.setText(body);
			mailSender.send(message);
			  
		} catch (Exception e) {
			e.printStackTrace();
			throw new IllegalIdentifierException("Cannot send email!");
		}
	}
	
}
