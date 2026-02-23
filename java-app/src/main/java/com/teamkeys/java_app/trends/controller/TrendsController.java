package com.teamkeys.java_app.trends.controller;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
