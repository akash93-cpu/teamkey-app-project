package com.teamkeys.java_app.users.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.teamkeys.java_app.users.entity.TokenEntity;

public interface TokenRepository extends JpaRepository<TokenEntity, Long> {

	Optional<TokenEntity> findByToken(String token);
	
}
