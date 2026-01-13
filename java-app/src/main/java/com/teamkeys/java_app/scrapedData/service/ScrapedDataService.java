package com.teamkeys.java_app.scrapedData.service;

import java.util.List;

import org.springframework.stereotype.Service;

//import com.example.demo.exception.NotFoundException;
import com.teamkeys.java_app.scrapedData.entity.ScrapedDataEntity;
import com.teamkeys.java_app.scrapedData.repo.MatchEvents;
import com.teamkeys.java_app.scrapedData.repo.ScrapedDataRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ScrapedDataService {
	private final ScrapedDataRepo repo;
	
	public List<ScrapedDataEntity> getAll() {
		return repo.findAll();
	}
	
    public List<ScrapedDataEntity> getByMatchId(int matchId) {
        List<ScrapedDataEntity> results = repo.findAllByMatchId(matchId);

        if (results.isEmpty()) {
//          throw new NotFoundException("No matches found with match_id " + matchId);
        	System.out.println("No matches found with match_id " + matchId);
        }

        return results;
    }
    
    public List<MatchEvents> getAllEvents() {
    	return repo.findAllMatchEvents();
    }	
}