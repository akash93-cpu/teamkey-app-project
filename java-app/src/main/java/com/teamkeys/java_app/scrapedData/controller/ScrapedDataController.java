package com.teamkeys.java_app.scrapedData.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teamkeys.java_app.scrapedData.entity.ScrapedDataEntity;
import com.teamkeys.java_app.scrapedData.repo.MatchEvents;
import com.teamkeys.java_app.scrapedData.service.MatchDetailsResponse;
import com.teamkeys.java_app.scrapedData.service.ScrapedDataService;

import lombok.RequiredArgsConstructor;

@CrossOrigin(allowedHeaders="Content-Type")
@RestController
@RequestMapping("/scraped")
@RequiredArgsConstructor
public class ScrapedDataController {
	
	private final ScrapedDataService service;
	
	@CrossOrigin(origins="http://localhost:5173")
	@GetMapping
	public List<ScrapedDataEntity> getAllRecords(){
		return service.getAll();
	}
	
	@CrossOrigin(origins="http://localhost:5173")
	@GetMapping("/matches/getAllEvents")
	public List<MatchEvents> getAllEventsNow() {
		return service.getAllEvents();
	}
	
	@CrossOrigin(origins="http://localhost:5173")
	@GetMapping("/matches/{matchId}")
	public MatchDetailsResponse getMatches(@PathVariable int matchId) {
		return service.getByMatchId(matchId);
	}
	
}