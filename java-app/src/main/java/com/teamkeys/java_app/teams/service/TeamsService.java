package com.teamkeys.java_app.teams.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.teamkeys.java_app.teams.entity.TeamsEntity;
import com.teamkeys.java_app.teams.repo.TeamsRepo;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TeamsService {
	private final TeamsRepo repo;
	
	public List<TeamsEntity> getAll() {
		return repo.findAll();
	}
}