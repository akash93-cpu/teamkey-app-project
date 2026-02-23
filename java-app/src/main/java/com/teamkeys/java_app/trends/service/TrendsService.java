package com.teamkeys.java_app.trends.service;
import java.util.List;
import org.springframework.stereotype.Service;

import com.teamkeys.java_app.trends.entity.TrendsEntity;
import com.teamkeys.java_app.trends.repo.TrendsRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TrendsService {
	
	public final TrendsRepo repo;
	
	public List<TrendsEntity> getAllTrends() {
		return repo.findAll();
	}

}