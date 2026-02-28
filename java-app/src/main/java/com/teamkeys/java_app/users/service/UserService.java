package com.teamkeys.java_app.users.service;

import java.security.NoSuchAlgorithmException;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.teamkeys.java_app.exceptions.BadRequestException;
import com.teamkeys.java_app.users.dto.UserDataTransferObject;
import com.teamkeys.java_app.users.entity.UserEntity;
import com.teamkeys.java_app.users.repo.UserRepository;
import org.springframework.security.crypto.bcrypt.BCrypt;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class UserService {
		
	private final UserRepository repository;
	private final ModelMapper mapper;
	
	private UserDataTransferObject convertToData(UserEntity entity) {
		return mapper.map(entity, UserDataTransferObject.class);
	}
	
	private UserEntity convertToEntity(UserDataTransferObject convertToData) {
		return mapper.map(convertToData, UserEntity.class);
	}
	
	public UserDataTransferObject createUser(UserDataTransferObject userDto, String password) throws NoSuchAlgorithmException {
		
		if (password == null || password.isBlank()) throw new IllegalArgumentException("Password required!");
		
		String passwordHash = BCrypt.hashpw(password, BCrypt.gensalt());
		
		var user = convertToEntity(userDto);
		
		var existsEmail = repository.existsByEmail(userDto.getEmail());
		if (existsEmail) throw new BadRequestException("Email " + user.getEmail() + " is taken!");
		var existsUsername = repository.existsByUserName(userDto.getUserName());
		if (existsUsername) throw new BadRequestException("Username " + user.getUserName() + " is taken!");
		var existsPhone = repository.existsByPhoneNumber(userDto.getPhoneNumber());
		if (existsPhone) throw new BadRequestException("Phone number " + user.getPhoneNumber() + "already exists!");
		
		user.setPassword(passwordHash);
//		System.out.println("Password match "+ BCrypt.checkpw(password, passwordHash));
		
		repository.save(user);
		return convertToData(user);
	}
	
}