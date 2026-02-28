package com.teamkeys.java_app.users.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor	
public class UserDataTransferObject {
	
	private int userId;
	private String email;
	private String userName;
	private String password;
	private int phoneNumber;
	
}