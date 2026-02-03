package com.teamkeys.java_app.statistics.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.teamkeys.java_app.statistics.entity.StatsEntity;

public interface StatsRepo extends JpaRepository<StatsEntity, Integer> {
	List<StatsEntity> findByMatchId(int matchId);
}