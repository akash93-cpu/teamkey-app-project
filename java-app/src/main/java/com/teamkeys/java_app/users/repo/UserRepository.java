package com.teamkeys.java_app.users.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.teamkeys.java_app.users.entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Integer> {
	
	Boolean existsByEmail(String emailString);
	Boolean existsByUserName(String userNameString);
	
	Optional<UserEntity> findByEmail(String email);
	UserEntity findUserByEmail(String email);
	void deleteByEmail(String email);
	
}