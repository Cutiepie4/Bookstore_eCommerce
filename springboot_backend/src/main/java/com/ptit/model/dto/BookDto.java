package com.ptit.model.dto;

import java.sql.Date;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookDto {
	
	private Long id;

	private String title;

	private String author;

	private String category;
	
	private String description;

	private Date date;

	private int sold, page, price, voters;
	
	private Double rating;
	
	private String imagePath;
}
