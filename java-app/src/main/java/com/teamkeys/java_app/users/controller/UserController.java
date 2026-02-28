package com.teamkeys.java_app.users.controller;

import java.security.NoSuchAlgorithmException;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.teamkeys.java_app.users.dto.UserDataTransferObject;
import com.teamkeys.java_app.users.service.UserService;

import org.springframework.web.bind.annotation.RequestBody;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
public class UserController {
	
	private final UserService service;
	
	@PostMapping("create-user")
	@ResponseStatus(HttpStatus.CREATED)
	public UserDataTransferObject createUser(@Valid @RequestBody UserDataTransferObject userDataTransferObject) throws NoSuchAlgorithmException {
		
		return service.createUser(userDataTransferObject, userDataTransferObject.getPassword());
	}

}
