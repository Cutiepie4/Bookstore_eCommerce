package com.ptit.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ptit.model.dto.BookDto;

@Service
public interface BookService {
	List<BookDto> findAll();
	
	BookDto findById(Long id);
	
	void save(BookDto book);
	
	void deleteById(Long id);
	
	List<BookDto> findTop5BestSellers();
	
	boolean validate(BookDto bookDto);
}
