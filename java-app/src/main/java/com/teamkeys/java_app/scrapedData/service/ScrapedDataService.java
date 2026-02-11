package com.teamkeys.java_app.scrapedData.service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.teamkeys.java_app.scrapedData.entity.ScrapedDataEntity;
import com.teamkeys.java_app.scrapedData.repo.MatchEvents;
import com.teamkeys.java_app.scrapedData.repo.ScrapedDataRepo;
import com.teamkeys.java_app.exceptions.NotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ScrapedDataService {
	private final ScrapedDataRepo repo;
	
	public List<ScrapedDataEntity> getAll() {
		return repo.findAll();
	}
	
    public MatchDetailsResponse getByMatchId(int matchId) {
        List<ScrapedDataEntity> results = repo.findAllByMatchIdOrdered(matchId);
        // List<ScrapedDataEntity> results = repo.findAllByMatchId(matchId); -- replaced

        if (results.isEmpty()) {
          throw new NotFoundException("No matches found with match_id " + matchId);
//        	System.out.println("No matches found with match_id " + matchId);
        }
        
        Map<String, Long> actionCounts = results.stream()
        		.collect(Collectors.groupingBy(ScrapedDataEntity::getAction,Collectors.counting()));
        
        return new MatchDetailsResponse(results, actionCounts);
    }
    
    public List<MatchEvents> getAllEvents() {
//    	return repo.findAllMatchEvents();
    	List<MatchEvents> resultsEvents = repo.findAllMatchEvents();
    	
    	if (resultsEvents.isEmpty()) throw new NotFoundException("No values found");
    	return resultsEvents;
    }	
}