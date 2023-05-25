package com.ptit.model.dto;

import com.ptit.model.entity.Book;
import com.ptit.model.entity.CartKey;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartDto {
	
	private Book book;
	
	private int quantity;
}
