package com.teamkeys.java_app.users.dto;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class EmailValidator implements ConstraintValidator<TeamKeysEmailClass, String>{
	
	@Override
	public boolean isValid(String email, ConstraintValidatorContext context) {
		if (email == null) return false;
		return email.endsWith("@teamkeys.com");
	}

}
