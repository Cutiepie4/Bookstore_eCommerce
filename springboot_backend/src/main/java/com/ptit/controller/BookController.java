package com.ptit.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ptit.model.dto.BookDto;
import com.ptit.service.BookService;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class BookController {

	@Autowired
	BookService bookService;

	@Autowired
	ObjectMapper objectMapper;

	@GetMapping("/books")
	public List<BookDto> getAllBooks() {
		return bookService.findAll();
	}

	@GetMapping("/books/{id}")
	public BookDto getBookById(@PathVariable String id) {
		return bookService.findById(Long.valueOf(id));
	}

//	@PostMapping("/books/new")
//	public void addBook(@RequestBody BookDto book) {
//		book.setId(null);
//		bookService.save(book);
//	}

	private String saveImage(MultipartFile image) throws IOException {
		// Define the directory to save the image
		String saveDirectory = "C:\\Users\\trvie\\Documents\\Code\\Library_web_fullstack\\reactjs_frontend\\src\\assets\\images";

		// Generate a unique file name for the image
		String fileName = UUID.randomUUID().toString() + "_" + image.getOriginalFilename();
		
		// Create the full file path
		Path filePath = Paths.get(saveDirectory, fileName);

		// Save the image file to the specified directory
		Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

		// Return the image path
		return fileName;
	}

	@PostMapping("/books/new")
	public List<BookDto> addBook(@RequestParam(value = "image", required = false) MultipartFile image,
			@RequestParam("book") String bookJson) {
		try {
			BookDto book = objectMapper.readValue(bookJson, BookDto.class);
			book.setId(null);

			// Save the image file and get the image path
			if (image != null) {
				String imagePath = saveImage(image);
				book.setImagePath(imagePath);
			}
			bookService.save(book);
			
			return bookService.findAll();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}

	@PutMapping("/books/update")
	public List<BookDto> updateBook(@RequestParam(value = "image", required = false) MultipartFile image,
			@RequestParam("book") String bookJson) {
		try {
			BookDto book = objectMapper.readValue(bookJson, BookDto.class);

			// Save the image file and get the image path
			if (image != null) {
				String imagePath = saveImage(image);
				book.setImagePath(imagePath);
			}
			bookService.save(book);
			
			return bookService.findAll();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}

	@DeleteMapping("/books/{id}")
	public List<BookDto> deleteBook(@PathVariable String id) {
		bookService.deleteById(Long.valueOf(id));
		return bookService.findAll();
	}
}
