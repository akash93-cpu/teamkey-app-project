package com.teamkeys.java_app.statistics.entity;

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
	
	// Other metric calculations done here
	
	@Transient
	public int getTotal3PtsAttempts() {
		return total3PtsMade + total2PtsMade;
	}
	
	@Transient
	public int getTotal2PtsAttempts() {
		return total2PtsMade + total2PtsMissed;
	}
	
	@Transient
	public int getTotalFreeThrowAttempts() {
		return totalFreeThrowsMade + totalFreeThrowsMissed;
	}
	
	@Transient
	public int getTotalFieldGoalsAttempts() {
		return getTotal2PtsAttempts() + getTotal3PtsAttempts();
	}
	
	@Transient
	public int getTotalFieldGoalsMade() {
		return total3PtsMade + total2PtsMade;
	}
	
	@Transient
	public double get2PtEfficiency() {
		int attempts = getTotal2PtsAttempts();
		if (attempts == 0) return 0.0;
		return Math.round((total2PtsMade * 100.0 / attempts) * 100.0) / 100.0;
	}
	
	@Transient
	public double get3PtEfficiency() {
		int attempts = getTotal3PtsAttempts();
		if (attempts == 0) return 0.0;
		return Math.round((total3PtsMade * 100.0 / attempts) * 100.0) / 100.0;
	}
	
	@Transient
	public double getFreeThrowEfficiency() {
		int attempts = getTotalFreeThrowAttempts();
		if (attempts == 0) return 0.0;
		return Math.round((totalFreeThrowsMade * 100.0 / attempts) * 100.0) / 100.0;
	}
	
}