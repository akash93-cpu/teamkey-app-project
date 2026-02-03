package com.teamkeys.java_app.teams.entity;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "teams")
public class TeamsEntity {
	
	@Id
	private int teamId;
	
	@Column(name = "team_name")
	private String teamName;
	
	@Column(name = "games_played")
	private int gamesPlayed;
	
	@Column(name = "games_won")
	private int gamesWon;
	
	@Column(name = "games_lost")
	private int gamesLost;
	
	@Column(name = "games_draw")
	private int gamesDraw;
	
}