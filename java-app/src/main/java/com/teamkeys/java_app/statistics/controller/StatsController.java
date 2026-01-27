package com.teamkeys.java_app.statistics.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teamkeys.java_app.statistics.service.StatsService;
import com.teamkeys.java_app.stats.entity.StatsEntity;
import lombok.RequiredArgsConstructor;

@CrossOrigin(allowedHeaders="Content-Type")
@RestController
@RequestMapping("/stats")
@RequiredArgsConstructor
public class StatsController {
	
	public final StatsService service;
	
	@CrossOrigin(origins = "http://localhost:5173")
	@GetMapping
	public List<StatsEntity> getAllStats() {
		return service.getAll();
	}
	
}