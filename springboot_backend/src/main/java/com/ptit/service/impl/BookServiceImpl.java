package com.ptit.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ptit.model.dto.BookDto;
import com.ptit.model.entity.Book;
import com.ptit.repository.BookRepository;
import com.ptit.service.BookService;

@Service
public class BookServiceImpl implements BookService {

	@Autowired
	ModelMapper modelMapper;

	@Autowired
	BookRepository bookRepository;

	@Override
	public List<BookDto> findAll() {
		return bookRepository.findAll().stream().map(book -> modelMapper.map(book, BookDto.class))
				.collect(Collectors.toList());
	}

	@Override
	public void save(BookDto book) {
		bookRepository.save(modelMapper.map(book, Book.class));
	}

	@Override
	public void deleteById(Long id) {
		bookRepository.deleteById(id);
	}

	@Override
	public BookDto findById(Long id) {
		Optional<Book> bookDto = bookRepository.findById(id);
		if(bookDto.isPresent()) return modelMapper.map(bookDto.get(), BookDto.class);
		return new BookDto();
	}
}
