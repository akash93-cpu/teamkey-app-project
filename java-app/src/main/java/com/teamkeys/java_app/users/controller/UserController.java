package com.teamkeys.java_app.users.controller;

import java.security.NoSuchAlgorithmException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.teamkeys.java_app.users.dto.UserDataTransferObject;
import com.teamkeys.java_app.users.service.UserService;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
public class UserController {
	
	private final UserService service;
	
	@PostMapping("/create-user")
	@ResponseStatus(HttpStatus.CREATED)
	public UserDataTransferObject createUser(@Valid @RequestBody UserDataTransferObject userDataTransferObject) 
			throws NoSuchAlgorithmException {
		
		return service.createUser(userDataTransferObject, userDataTransferObject.getPassword());
	}
	
	@DeleteMapping("/delete-user/{email}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteUserByEmail(@PathVariable("email") String email) {
		
		service.removeUserByEmail(email);
		
	}
	
//	@PutMapping("/update-user/{email}")
//	public void updateUser(@Valid @RequestBody @PathVariable("email") String email, UserDataTransferObject userDataTransferObject) 
//			throws NoSuchAlgorithmException {
//		
//		service.updateUser(email, userDataTransferObject, userDataTransferObject.getPassword(), userDataTransferObject.getPhoneNumber());
//		
//	}
	
	@PutMapping("/update-user/{email}")
	public ResponseEntity<Void> updateUser(
	        @PathVariable("email") String email,
	        @Valid @RequestBody UserDataTransferObject userDataTransferObject)
	        throws NoSuchAlgorithmException {

	    service.updateUser(
	        email,
	        userDataTransferObject,
	        userDataTransferObject.getPassword(),
	        userDataTransferObject.getPhoneNumber()
	    );
	    return ResponseEntity.ok().build();
	}
	
	@GetMapping("/confirm-token")
	public ResponseEntity<String> confirmToken(@RequestParam("token") String token) {
	    service.confirmToken(token);
	    return ResponseEntity.ok("Token confirmed successfully! Your account is now activated!");
	}
	
}
