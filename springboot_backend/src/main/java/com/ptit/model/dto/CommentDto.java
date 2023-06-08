package com.ptit.model.dto;

import java.sql.Date;

import com.ptit.model.entity.Book;
import com.ptit.model.entity.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentDto {
	private Long id;
	
	private User user;
	
	private Book book;
	
	private String comment;
	
	private Date date;
	
	private int vote;
}
