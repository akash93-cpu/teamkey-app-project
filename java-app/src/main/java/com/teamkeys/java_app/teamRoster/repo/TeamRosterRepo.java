package com.teamkeys.java_app.teamRoster.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.teamkeys.java_app.teamRoster.entity.TeamRosterEntity;

public interface TeamRosterRepo extends JpaRepository<TeamRosterEntity, Integer> {
	List<TeamRosterEntity> findAllByTeamId(int teamId);
	List<TeamRosterEntity> findAllByTeamName(String playerName);
}