package com.ptit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ptit.model.dto.BookDto;
import com.ptit.service.BookService;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class BookController {
	
	@Autowired
	BookService bookService;
	
	@GetMapping("/test")
	public String a() {
		return "login success";
	}
	
	@GetMapping("/books")
	public List<BookDto> getAllBooks() {
		return bookService.findAll();
	}
	
	@GetMapping("/books/{id}")
	public BookDto getBookById(@PathVariable String id) {
		return bookService.findById(Long.valueOf(id));
	}
	
	@PostMapping("/books/new")
	public void addBook(@RequestBody BookDto book) {
		book.setId(null);
		bookService.save(book);
	}
	
	@PutMapping("/books/update")
	public void updateBook(@RequestBody BookDto book) {
		bookService.save(book);
	}
	
	@DeleteMapping("/books/{id}")
	public void deleteBook(@PathVariable String id) {
		bookService.deleteById(Long.valueOf(id));
	}
}
