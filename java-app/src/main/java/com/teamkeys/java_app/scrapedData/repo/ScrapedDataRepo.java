package com.teamkeys.java_app.scrapedData.repo;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.teamkeys.java_app.scrapedData.entity.ScrapedDataEntity;

public interface ScrapedDataRepo extends JpaRepository<ScrapedDataEntity, UUID> {

}
