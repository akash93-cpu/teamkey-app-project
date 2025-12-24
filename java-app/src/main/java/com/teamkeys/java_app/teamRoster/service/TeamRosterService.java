package com.teamkeys.java_app.teamRoster.service;

import java.util.List;
import com.teamkeys.java_app.teamRoster.entity.TeamRosterEntity;
import com.teamkeys.java_app.teamRoster.repo.TeamRosterRepo;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TeamRosterService {
	private final TeamRosterRepo repo;
	
	public List<TeamRosterEntity> getAll() {
		return repo.findAll();
	}
	
	public List<TeamRosterEntity> getByTeamId(int teamId) {
		List<TeamRosterEntity> teamResults = repo.findAllByTeamId(teamId);
		
		if (teamResults.isEmpty()) System.out.println("No team with "+ teamResults + " found");
		return teamResults;
	}
	
	public List<TeamRosterEntity> getByTeamName(String teamName) {
		List<TeamRosterEntity> teamNameResultsEntities = repo.findAllByTeamName(teamName);
		
		if (teamNameResultsEntities.isEmpty()) System.out.println("No team with " + teamNameResultsEntities + " found");
		return teamNameResultsEntities;
	}
	
}