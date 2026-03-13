package com.teamkeys.java_app.jwt.controller;

import jakarta.servlet.http.Cookie;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
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

//	private final AuthenticationManager authenticationManager;
	private final JwtUtil jwtUtil;
	private final ApplicationUserDetailsService detailsService;
	
	@PostMapping("/auth")
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
		cookie.setMaxAge(24 * 60 * 60);
		
		response.addCookie(cookie);
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
