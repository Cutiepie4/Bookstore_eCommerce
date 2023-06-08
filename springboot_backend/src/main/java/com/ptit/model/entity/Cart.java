package com.ptit.model.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "cart")
public class Cart {
	
	@EmbeddedId
	private CartKey id;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@MapsId("username")
	@JoinColumn(name = "username")
	private User user;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@MapsId("book_id")
	@JoinColumn(name = "book_id")
	private Book book;
	
	private int quantity;
}