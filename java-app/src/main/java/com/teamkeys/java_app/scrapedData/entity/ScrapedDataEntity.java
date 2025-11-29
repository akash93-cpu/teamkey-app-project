package com.teamkeys.java_app.scrapedData.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "scraped_data")

public class ScrapedDataEntity {
	
    @Id
    private UUID id;

    @Column(name = "match_id")
    private int matchId;

    private String team;

    @Column(name = "player_id")
    private int playerId;

    private String action;
    private int quarter;
    private String time;

    @Column(name = "a_team_points")
    private int aTeamPoints;

    @Column(name = "b_team_points")
    private int bTeamPoints;

}