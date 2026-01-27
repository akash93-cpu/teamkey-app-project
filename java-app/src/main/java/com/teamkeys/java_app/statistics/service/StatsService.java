package com.teamkeys.java_app.statistics.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.teamkeys.java_app.statistics.repo.StatsRepo;
import com.teamkeys.java_app.stats.entity.StatsEntity;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StatsService {
	private final StatsRepo repo;
	
	public List<StatsEntity> getAll() {
		return repo.findAll();
	}
	
}
