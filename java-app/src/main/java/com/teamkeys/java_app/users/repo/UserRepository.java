package com.teamkeys.java_app.users.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.teamkeys.java_app.users.entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Integer> {
	
	Boolean existsByEmail(String emailString);
	Boolean existsByUserName(String userNameString);
	Boolean existsByPhoneNumber(int phoneNumber);
	
}