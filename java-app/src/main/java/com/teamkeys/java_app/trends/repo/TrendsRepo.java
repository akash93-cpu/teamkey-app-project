package com.teamkeys.java_app.trends.repo;
import org.springframework.data.jpa.repository.JpaRepository;

import com.teamkeys.java_app.trends.entity.TrendsEntity;
public interface TrendsRepo extends JpaRepository<TrendsEntity, Integer> {
	
}