package com.teamkeys.java_app.users.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor	
public class UsernameDto {
	
    @NotBlank(message = "Username cannot be empty!")
    @Pattern(regexp = "^[a-zA-Z0-9]+$", message = "Username cannot contain special characters or spaces!")
	private String userName;

}
