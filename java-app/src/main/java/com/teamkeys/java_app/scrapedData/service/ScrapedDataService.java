package com.teamkeys.java_app.scrapedData.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.teamkeys.java_app.scrapedData.entity.ScrapedDataEntity;
import com.teamkeys.java_app.scrapedData.repo.ScrapedDataRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ScrapedDataService {
	private final ScrapedDataRepo repo;
	
	public List<ScrapedDataEntity> getAll() {
		return repo.findAll();
	}
}
