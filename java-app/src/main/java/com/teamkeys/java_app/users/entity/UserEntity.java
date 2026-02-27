package com.teamkeys.java_app.users.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users")
public class UserEntity {
	
	@Id
	private int userId;
	
	@Column(name = "email")
	private String emailString;
	
	@Column(name = "username")
	private String userNameString;
	
	@Column(name = "password")
	private String passwordString;
	
	@Column(name = "phone")
	private int phoneNumber;
}
