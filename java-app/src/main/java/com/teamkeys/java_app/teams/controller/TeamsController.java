package com.teamkeys.java_app.teams.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teamkeys.java_app.teams.entity.TeamsEntity;
import com.teamkeys.java_app.teams.service.TeamsService;

import lombok.RequiredArgsConstructor;

@CrossOrigin(allowedHeaders="Content-Type")
@RestController
@RequestMapping("/teams")
@RequiredArgsConstructor
public class TeamsController {
	
	public final TeamsService service;
	
	@CrossOrigin(origins = "http://localhost:5173")
	@GetMapping
	public List<TeamsEntity> getAllTeams() {
		return service.getAll();
	}
}