package com.teamkeys.java_app.users.service;

import java.security.NoSuchAlgorithmException;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.teamkeys.java_app.exceptions.NotFoundException;
import com.teamkeys.java_app.exceptions.BadRequestException;
import com.teamkeys.java_app.users.dto.UserDataTransferObject;
import com.teamkeys.java_app.users.entity.UserEntity;
import com.teamkeys.java_app.users.repo.UserRepository;

import jakarta.transaction.Transactional;

import org.springframework.security.crypto.bcrypt.BCrypt;

import lombok.AllArgsConstructor;
import lombok.experimental.var;

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
	
	@SuppressWarnings("deprecation")
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
		
		repository.save(user);
		return convertToData(user);
	}
	
	@Transactional
	public void removeUserByEmail(String email) {
		findOrThrow(email);
		repository.deleteByEmail(email);
	}
	
	private UserEntity findOrThrow(final String email) {
		return repository.findByEmail(email).orElseThrow(
				() -> new NotFoundException("User by id " + email + " was not found")
				);
	}
	
	@SuppressWarnings("deprecation")
	public void updateUser(String email, UserDataTransferObject userDto, String password, long phoneNumber) 
			throws NoSuchAlgorithmException {
		
		var user = findOrThrow(email);
		var userParam = convertToEntity(userDto);
		
		user.setUserName(userParam.getUserName());
		user.setPhoneNumber(phoneNumber);
		
		if (!password.isBlank()) {
			String passwordHash = BCrypt.hashpw(password, BCrypt.gensalt());
			user.setPassword(passwordHash);
		}
		
		repository.save(user);
	}
	
}