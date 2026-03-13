package com.teamkeys.java_app.scrapedData.controller;

import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teamkeys.java_app.scrapedData.dto.ScrapedDataDto;
import com.teamkeys.java_app.scrapedData.entity.ScrapedDataEntity;
import com.teamkeys.java_app.scrapedData.repo.MatchEvents;
import com.teamkeys.java_app.scrapedData.service.MatchDetailsResponse;
import com.teamkeys.java_app.scrapedData.service.ScrapedDataService;

import io.swagger.v3.oas.annotations.Hidden;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@CrossOrigin(allowedHeaders="Content-Type")
@RestController
@RequestMapping("/scraped")
@RequiredArgsConstructor 
public class ScrapedDataController {
	
	private final ScrapedDataService service;
	
	@Hidden
	@CrossOrigin(origins="http://localhost:5173", allowCredentials = "true")
	@GetMapping
	@PreAuthorize("isAuthenticated()")
	public List<ScrapedDataEntity> getAllRecords() {
		return service.getAll();
	}
	
	@CrossOrigin(origins="http://localhost:5173", allowCredentials = "true")
	@GetMapping("/matches/getAllEvents")
	public List<MatchEvents> getAllEventsNow() {
		return service.getAllEvents();
	}
	
	@CrossOrigin(origins="http://localhost:5173")
	@GetMapping("/matches/{matchId}")
	@PreAuthorize("isAuthenticated()")
	public MatchDetailsResponse getMatches(@PathVariable int matchId) {
		return service.getByMatchId(matchId);
	}
	
	@PutMapping("/update-entry/{id}")
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<Void> updateEntry(@PathVariable("id") UUID id, @Valid @RequestBody ScrapedDataDto dto) throws NoSuchAlgorithmException {
		service.updateScrapedData(dto, id);
		return ResponseEntity.ok().build();
	}
	
}