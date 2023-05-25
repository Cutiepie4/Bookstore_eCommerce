package com.ptit.model.entity;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import lombok.Data;

@Data
@Entity
public class UserRole {
	
	@EmbeddedId
	UserRoleKey id;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@MapsId("username")
	@JoinColumn(name = "username")
	private User user;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@MapsId("role")
	@JoinColumn(name = "role")
	private Role role;
}
