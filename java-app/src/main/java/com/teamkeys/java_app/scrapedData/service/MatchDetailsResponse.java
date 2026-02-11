package com.teamkeys.java_app.scrapedData.service;

import java.util.*;
import com.teamkeys.java_app.scrapedData.entity.ScrapedDataEntity;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MatchDetailsResponse {

	private List<ScrapedDataEntity> eventsDataEntities;
	private Map<String, Long> actionCountsMap;	
	
}