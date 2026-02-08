package com.teamkeys.java_app.teams.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.teamkeys.java_app.teams.entity.TeamsEntity;

public interface TeamsRepo extends JpaRepository<TeamsEntity, Integer> {
	
	String sql_find_all_teamString = "SELECT * FROM teams WHERE games_played >= 1";
	
    @Query(value = sql_find_all_teamString, nativeQuery = true)
	List<TeamsEntity> findAllTeams();
	List<TeamsEntity> findByTeamId(int teamId); // not currently used
}