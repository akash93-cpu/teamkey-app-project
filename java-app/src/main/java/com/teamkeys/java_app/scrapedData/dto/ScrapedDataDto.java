package com.teamkeys.java_app.scrapedData.dto;

import java.util.UUID;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor	
public class ScrapedDataDto {
	
	private UUID id;
	
	@Max(value = 999)
	@Min(value = 0)
    private int aTeamPoints;
	
	@Max(value = 999)
	@Min(value = 0)
    private int bTeamPoints;

}
