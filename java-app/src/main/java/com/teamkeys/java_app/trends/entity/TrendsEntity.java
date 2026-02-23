package com.teamkeys.java_app.trends.entity;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "trends")
public class TrendsEntity {
	
	@Id
	private int trendId;
	
	@Column(name = "team_id")
	private int teamId;

	@Column(name = "team_name")
	private String teamName;
	
	@Column(name = "actual_score")
	private int[] actualScore;
	
	@Column(name = "predicted_score")
	private float[] predictedScore;
	
}
