package com.ptit.model.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookDto {
	private Long id;

	private String title, author, category, description;

	private LocalDate date;

	private int sold, page;
}
