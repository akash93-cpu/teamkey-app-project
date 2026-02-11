package com.teamkeys.java_app.scrapedData.repo;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.teamkeys.java_app.scrapedData.entity.ScrapedDataEntity;

//import io.lettuce.core.dynamic.annotation.Param;

public interface ScrapedDataRepo extends JpaRepository<ScrapedDataEntity, UUID> {
	
	String sql_find_query = "SELECT match_id as matchId, COUNT(*) AS eventsCount FROM scraped_data GROUP BY match_id HAVING COUNT(*) > 1";
	
	String sql_find_and_sortString = "SELECT *\r\n"
			+ "FROM scraped_data\r\n"
			+ "WHERE match_id = :matchId\r\n"
			+ "ORDER BY quarter ASC, time::time DESC\r\n";
			
	@Query(value = sql_find_and_sortString, nativeQuery = true)
    List<ScrapedDataEntity> findAllByMatchIdOrdered(@Param("matchId") int matchId);
	// List<ScrapedDataEntity> findAllByMatchId(int matchId); -- original query replaced

    @Query(value = sql_find_query, nativeQuery = true)
    List<MatchEvents> findAllMatchEvents();
}