package com.teamkeys.java_app.teams.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.teamkeys.java_app.teams.entity.TeamsEntity;

public interface TeamsRepo extends JpaRepository<TeamsEntity, Integer> {
	List<TeamsEntity> findByTeamId(int teamId);
}