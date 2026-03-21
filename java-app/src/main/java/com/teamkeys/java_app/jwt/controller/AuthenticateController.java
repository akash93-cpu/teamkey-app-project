package com.teamkeys.java_app.jwt.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.teamkeys.java_app.jwt.models.AuthenticationRequest;
import com.teamkeys.java_app.jwt.service.ApplicationUserDetailsService;
import com.teamkeys.java_app.jwt.util.JwtUtil;
import com.teamkeys.java_app.users.entity.UserEntity;

import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
class AuthenticateController {

	private final JwtUtil jwtUtil;
	private final ApplicationUserDetailsService detailsService;
	
	@PostMapping("/login")
	@ResponseStatus(HttpStatus.CREATED)
	public void authenticate(@RequestBody AuthenticationRequest req, HttpServletResponse response) throws Exception {
		
		UserEntity user;
		
		try {
			user = detailsService.authenticate(req.getEmail(), req.getPassword());
		} catch (BadCredentialsException e) {
			throw new Exception("Incorrect Username or Password!", e);
		}
		
		try {
			user = detailsService.checkAccountState(req.getEmail());
		} catch (BadCredentialsException e) {
			throw new Exception("Account not yet active! Please verify your account!", e);
		}
		
		var userDetails = detailsService.loadUserByUsername(user.getEmail());
//		System.out.println(userDetails);
		var jwt = jwtUtil.generateToken(userDetails);
		
		Cookie cookie = new Cookie("jwt", jwt);
		cookie.setHttpOnly(true);
		cookie.setSecure(true);
		cookie.setPath("/");
		cookie.setMaxAge(12 * 60 * 60); // 12 hour cookie lifetime
		
		response.addCookie(cookie);
		
	}
	
	@GetMapping("/user-token")
	public String getUsernameToken(HttpServletRequest request) throws Exception {
		
	    String jwt = null;
	    if (request.getCookies() != null) {
	        for (Cookie cookie : request.getCookies()) {
	            if ("jwt".equals(cookie.getName())) {
	                jwt = cookie.getValue();
	                break;
	            }
	        }
	    }

	    if (jwt == null) {
	        throw new Exception("JWT cookie not found");
	    }

	    String username = jwtUtil.extractActualUsername(jwt);
	    return username;
	    
	}	
	
	@PostMapping("/logout")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void logout(HttpServletResponse res) {
		
		Cookie cookie = new Cookie("jwt", null);
		cookie.setHttpOnly(true);
		cookie.setSecure(true);
		cookie.setPath("/");
		cookie.setMaxAge(0);
		
		res.addCookie(cookie);
		
	}
		
}
