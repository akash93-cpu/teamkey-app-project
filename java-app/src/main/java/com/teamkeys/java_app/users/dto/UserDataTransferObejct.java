package com.teamkeys.java_app.users.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor	
public class UserDataTransferObejct {
	
	private int userId;
	private String emailString;
	private String userNameString;
	private String passwordString;
	private int phoneNumber; 
	
}