package com.ptit.model.entity;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "books")
public class Book {
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(columnDefinition = "nvarchar(255)")
	private String title;

	@Column(columnDefinition = "nvarchar(255)")
	private String author;

	@Column(columnDefinition = "nvarchar(255)")
	private String category;

	@Column(columnDefinition = "nvarchar(MAX)")
	private String description;

	private Date date;

	private int sold, page, price;
	
	@Column(columnDefinition = "nvarchar(255)")
	private String imagePath;
}
