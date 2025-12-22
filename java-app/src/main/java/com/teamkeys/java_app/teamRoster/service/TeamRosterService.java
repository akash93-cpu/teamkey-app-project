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
}
