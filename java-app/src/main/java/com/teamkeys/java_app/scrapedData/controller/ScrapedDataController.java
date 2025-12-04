package com.teamkeys.java_app.scrapedData.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teamkeys.java_app.scrapedData.entity.ScrapedDataEntity;
import com.teamkeys.java_app.scrapedData.service.ScrapedDataService;

import jakarta.websocket.server.PathParam;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/scraped")
@RequiredArgsConstructor
public class ScrapedDataController {
	private final ScrapedDataService service;
	
	@GetMapping
	public List<ScrapedDataEntity> getAllRecords(){
		return service.getAll();
	}
	
	@GetMapping("/matches/{matchId}")
	public List<ScrapedDataEntity> getMatches(@PathVariable int matchId) {
		return service.getByMatchId(matchId);
	}
	
}