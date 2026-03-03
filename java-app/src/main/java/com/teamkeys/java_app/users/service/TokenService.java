package com.teamkeys.java_app.users.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.teamkeys.java_app.users.entity.TokenEntity;
import com.teamkeys.java_app.users.repo.TokenRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class TokenService {
	
	private final TokenRepository tokenRepo;
	
	public Optional<TokenEntity> findByToken(String token) {
		return tokenRepo.findByToken(token);
	}
	
	public void save(TokenEntity token) {
		tokenRepo.save(token);
	}
	

}
