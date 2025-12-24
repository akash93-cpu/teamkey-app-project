package com.teamkeys.java_app.teamRoster.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

import com.teamkeys.java_app.scrapedData.service.ScrapedDataService;
import com.teamkeys.java_app.teamRoster.entity.TeamRosterEntity;
import com.teamkeys.java_app.teamRoster.service.TeamRosterService;

@CrossOrigin(allowedHeaders="Content-Type")
@RestController
@RequestMapping("/team-roster")
@RequiredArgsConstructor
public class TeamRosterController {

	public final TeamRosterService service;
	
	@CrossOrigin(origins = "http://localhost:5173")
	@GetMapping
	public List<TeamRosterEntity> getAllTeams() {
		return service.getAll();
	}
	
	@CrossOrigin(origins = "http://localhost:5173")
	@GetMapping("teams/{teamId}")
	public List<TeamRosterEntity> getAllTeamsById(@PathVariable int teamId) {
		return service.getByTeamId(teamId);
	}
	
	@CrossOrigin(origins = "http://localhost:5173")
	@GetMapping("team-names/{teamName}")
	public List<TeamRosterEntity> getAllTeamsByName(@PathVariable String teamName) {
		return service.getByTeamName(teamName);
	}
	
}