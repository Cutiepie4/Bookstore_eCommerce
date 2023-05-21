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

	@Column(columnDefinition = "nvarchar(255)")
	private String title;

	@Column(columnDefinition = "nvarchar(255)")
	private String author;

	@Column(columnDefinition = "nvarchar(255)")
	private String category;

	@Column(columnDefinition = "nvarchar(255)")
	private String description;

	private Date date;

	private int sold, page, price;
	
	@Column(columnDefinition = "nvarchar(255)")
	private String imagePath;
}
