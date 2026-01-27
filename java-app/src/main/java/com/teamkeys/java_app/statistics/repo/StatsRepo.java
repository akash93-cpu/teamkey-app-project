package com.teamkeys.java_app.statistics.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.teamkeys.java_app.stats.entity.StatsEntity;

public interface StatsRepo extends JpaRepository<StatsEntity, Integer> {
	
}
