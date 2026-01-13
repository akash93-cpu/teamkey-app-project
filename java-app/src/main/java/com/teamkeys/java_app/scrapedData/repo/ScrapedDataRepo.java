package com.teamkeys.java_app.scrapedData.repo;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.teamkeys.java_app.scrapedData.entity.ScrapedDataEntity;

public interface ScrapedDataRepo extends JpaRepository<ScrapedDataEntity, UUID> {
	
	String sql_find_query = "SELECT match_id as matchId, COUNT(*) AS eventsCount FROM scraped_data GROUP BY match_id HAVING COUNT(*) > 1";
	
    List<ScrapedDataEntity> findAllByMatchId(int matchId);
    
    @Query(value = sql_find_query, nativeQuery = true)
    List<MatchEvents> findAllMatchEvents();
}
