package com.teamkeys.java_app.trends.controller;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teamkeys.java_app.trends.entity.TrendsDto;
import com.teamkeys.java_app.trends.entity.TrendsEntity;
import com.teamkeys.java_app.trends.service.TrendsService;

import lombok.RequiredArgsConstructor;
@CrossOrigin(allowedHeaders="Content-Type")
@RestController
@RequestMapping("/trends")
@RequiredArgsConstructor
public class TrendsController {
	public final TrendsService service;
	
	@CrossOrigin(origins = "http://localhost:5173")
	@GetMapping
	public List<TrendsEntity> getAllTrendsList() {
		return service.getAllTrends();
	}
	
	@PreAuthorize("isAuthenticated()")
	@PutMapping("/predicted-score")
	public ResponseEntity<?> updatePredictedScore(@RequestBody TrendsDto dto) {
	    service.updatePredictedScore(dto);
	    return ResponseEntity.ok().build();
	}
}
