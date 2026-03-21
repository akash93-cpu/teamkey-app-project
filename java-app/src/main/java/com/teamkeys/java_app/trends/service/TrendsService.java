package com.teamkeys.java_app.trends.service;
import java.util.List;

import org.springframework.stereotype.Service;

import com.teamkeys.java_app.trends.entity.TrendsDto;
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
	
	public void updatePredictedScore(TrendsDto dto) {

	    TrendsEntity entity = repo.findById(dto.getTrendId())
	        .orElseThrow(() -> new RuntimeException("Trend ID not found"));

	    // ✅ Validate length before setting
	    if (dto.getPredictedScore() == null) {
	        throw new IllegalArgumentException("predictedScore cannot be null");
	    }

	    if (entity.getActualScore() == null) {
	        throw new IllegalStateException("actualScore is not initialized in DB");
	    }

	    if (dto.getPredictedScore().length != entity.getActualScore().length) {
	        throw new IllegalArgumentException(
	            "predictedScore must have length " + entity.getActualScore().length
	        );
	    }

	    entity.setPredictedScore(dto.getPredictedScore());
	    repo.save(entity);
	}	
}