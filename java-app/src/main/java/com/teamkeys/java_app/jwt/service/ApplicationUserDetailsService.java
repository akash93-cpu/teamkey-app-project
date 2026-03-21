package com.teamkeys.java_app.jwt.service;

import java.security.NoSuchAlgorithmException;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import com.teamkeys.java_app.jwt.models.UserPrinciple;
import com.teamkeys.java_app.users.entity.UserEntity;
import com.teamkeys.java_app.users.service.UserService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ApplicationUserDetailsService implements UserDetailsService {
	
	private final UserService userService;
	
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
	    UserEntity user = userService.findAnyByEmail(email);
	    
	    if (user == null) {
	        throw new UsernameNotFoundException("User not found with email: " + email);
	    }
	    
	    return new UserPrinciple(user);
	}
	
	private Boolean verifyPasswordHash(String password, String passwordHash) throws NoSuchAlgorithmException {
		
		if (password.isBlank() || password.isEmpty())
			throw new IllegalArgumentException("Password cannot be empty or whitespace only string.");

		return BCrypt.checkpw(password, passwordHash);
		
	}
	
	public UserEntity authenticate(String email, String password) throws NoSuchAlgorithmException {

	    if (email.isBlank() || password.isBlank()) 
	        throw new BadCredentialsException("Unauthorized");
	    
	    var userEntity = userService.findAnyByEmail(email);
	    if (userEntity == null) 
	        throw new BadCredentialsException("Not authorized!");

	    var verified = verifyPasswordHash(password, userEntity.getPassword());
	    if (!verified) 
	        throw new BadCredentialsException("Unauthorized");
	    
	    return userEntity;
	}
	
	public UserEntity checkAccountState(String email) throws NoSuchAlgorithmException {
		var userEntity = userService.findAnyByEmail(email);
		
		if(!userEntity.isActive())
	    	throw new BadCredentialsException("User is not yet verified! Please verify your account!");
		
		return userEntity;
	}

}