package com.teamkeys.java_app.stats.entity;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "statistics")
public class StatsEntity {
	
	@Id
	private int dataId;
	
	@Column(name = "match_id")
	private int matchId;
	
	@Column(name = "team_id")
	private int teamId;
	
	@Column(name = "total_3_pts_made")
	private int total3PtsMade;
	
	@Column(name = "total_3_pts_missed")
	private int total3PtsMissed;
	
	@Column(name = "total_2_pts_made")
	private int total2PtsMade;
	
	@Column(name = "total_2_pts_missed")
	private int total2PtsMissed;
	
	@Column(name = "total_team_pts")
	private int totalTeamPts;
	
	@Column(name = "overtime")
	private boolean overTime;
	
	@Column(name = "total_free_throws_made")
	private int totalFreeThrowsMade;
	
	@Column(name = "total_free_throws_missed")
	private int totalFreeThrowsMissed;
	
	@Column(name = "team_name")
	private String teamName;
}
