package com.teamkeys.java_app.statistics.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.teamkeys.java_app.exceptions.NotFoundException;
import com.teamkeys.java_app.statistics.entity.StatsEntity;
import com.teamkeys.java_app.statistics.repo.StatsRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StatsService {
	
	private final StatsRepo repo;
	
	public List<StatsEntity> getAll() {
		return repo.findAll();
	}
	
	public List<StatsEntity> getStatsByMatchId(int matchId) {
		List<StatsEntity> resultSet = repo.findByMatchId(matchId);
		
        if (resultSet.isEmpty()) {
            throw new NotFoundException("No matches found with match_id " + matchId);
          }
          return resultSet;
	}
	
	public List<StatsEntity> getStatsByTeamId(int teamId) {
		List<StatsEntity> resultSetEntities = repo.findByTeamId(teamId);
		
		if (resultSetEntities.isEmpty()) {
			throw new NotFoundException("No teams found for team_id " + teamId);
		}
		return resultSetEntities;
	}
	
}