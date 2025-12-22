package com.teamkeys.java_app.teamRoster.entity;


import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "player_roster")
public class TeamRosterEntity {

	@Id
	private int playerId;
	
	@Column(name = "player_name")
	private String playerName;
	
	@Column(name = "player_surname")
	private String playerSurname;
	
	private int teamId;
	
	@Column(name = "team_name")
	private String teamName;
	
}