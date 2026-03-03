package com.teamkeys.java_app.users.service;

import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.teamkeys.java_app.exceptions.NotFoundException;
import com.teamkeys.java_app.exceptions.BadRequestException;
import com.teamkeys.java_app.users.dto.UserDataTransferObject;
import com.teamkeys.java_app.users.entity.TokenEntity;
import com.teamkeys.java_app.users.entity.UserEntity;
import com.teamkeys.java_app.users.repo.UserRepository;

import jakarta.transaction.Transactional;

import org.springframework.security.crypto.bcrypt.BCrypt;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class UserService {

	private final UserRepository repository;
	private final ModelMapper mapper;
	private final TokenService tokenService;
	private final EmailService emailService;

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
		
		repository.save(user);
		
		// token and email verification here
		
		String token = UUID.randomUUID().toString();
		TokenEntity confirmToken = new TokenEntity(
				token, LocalDateTime.now(), LocalDateTime.now().plusMinutes(15), user);
		tokenService.save(confirmToken);
		emailService.sendSimpleEmail(userDto.getEmail(), token);
		System.out.println(token);
		
		return convertToData(user);
	}
	
	public void enableUser(UserEntity userEntity) {
		userEntity.setActive(true);
		repository.save(userEntity);
	}
	
	@Transactional
	public void confirmToken(String token) {
		TokenEntity confirmToken = tokenService.findByToken(token)
				.orElseThrow(() -> new IllegalArgumentException("Invalid Token!"));
		
		if(confirmToken.getConfirmedAt() != null) {
			throw new IllegalStateException("User already confirmed!");
		}
		
		LocalDateTime expiresAt = confirmToken.getExpiresAt();
		
		if(expiresAt.isBefore(LocalDateTime.now())) {
			throw new IllegalStateException("Token expired!");
		}
		
		confirmToken.setConfirmedAt(LocalDateTime.now());
		tokenService.save(confirmToken);
		
		enableUser(confirmToken.getUser());
		
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