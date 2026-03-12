package com.teamkeys.java_app.scrapedData.controller;

import java.util.List;
import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

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
	private final ModelMapper mapper;
	
	private ScrapedDataEntity convertToEntity(ScrapedDataDto dto) {
		return mapper.map(dto, ScrapedDataEntity.class);
	}
	
	@Hidden
	@CrossOrigin(origins="http://localhost:5173", allowCredentials = "true")
	@GetMapping
	@PreAuthorize("isAuthenticated()")
	public List<ScrapedDataEntity> getAllRecords(){
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
	
	@PutMapping("/{id}")
	public void putData(@PathVariable("id") UUID id, @Valid @RequestBody ScrapedDataDto dto) {
		if (!id.equals(dto.getId())) throw new ResponseStatusException (HttpStatus.BAD_REQUEST, "id does not match");
		service.updateScrapedDataEntry(id, convertToEntity(dto));
	}
	
}