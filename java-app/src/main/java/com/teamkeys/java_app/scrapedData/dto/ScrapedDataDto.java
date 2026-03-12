package com.teamkeys.java_app.scrapedData.dto;

import java.util.UUID;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor	
public class ScrapedDataDto {
	
	private UUID id;
	
	@Positive
	@Max(value = 999)
    private int aTeamPoints;
	
	@Positive
	@Max(value = 999)
    private int bTeamPoints;

}
