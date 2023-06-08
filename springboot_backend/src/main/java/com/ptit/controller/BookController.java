package com.ptit.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
import com.ptit.model.entity.Rating;
import com.ptit.service.BookService;
import com.ptit.service.RatingService;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class BookController {

	@Autowired
	BookService bookService;

	@Autowired
	ObjectMapper objectMapper;

	@Autowired
	RatingService ratingService;

	@GetMapping("/books")
	public List<BookDto> getAllBooks() {
		return bookService.findAll();
	}

	@GetMapping("/books/{id}")
	public BookDto getBookById(@PathVariable String id) {
		return bookService.findById(Long.valueOf(id));
	}

	private String saveImage(MultipartFile image) throws IOException {
		String saveDirectory = "C:\\Users\\trvie\\Documents\\Code\\Library_web_fullstack\\reactjs_frontend\\src\\assets\\images";
//		String saveDirectory = "C:\\Users\\trvie\\Documents\\Library_web_fullstack\\reactjs_frontend\\src\\assets\\images";
		String fileName = UUID.randomUUID().toString() + "_" + image.getOriginalFilename();
		Path filePath = Paths.get(saveDirectory, fileName);
		Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
		return fileName;
	}

	@PostMapping("/books/new")
	public ResponseEntity<?> addBook(@RequestParam(value = "image", required = false) MultipartFile image,
			@RequestParam("book") String bookJson) {

		try {
			BookDto book = objectMapper.readValue(bookJson, BookDto.class);
			book.setId(null);

			if (!bookService.validate(book)) {
				return ResponseEntity.status(500).body("Existed book with the same title and author.");
			}

			// Save the image file and get the image path
			if (image != null) {
				String imagePath = saveImage(image);
				book.setImagePath(imagePath);
			}
			
			bookService.save(book);
			return ResponseEntity.ok(bookService.findAll());
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}

	@PutMapping("/books/update")
	public ResponseEntity<?> updateBook(@RequestParam(value = "image", required = false) MultipartFile image,
			@RequestParam("book") String bookJson) {
		try {
			BookDto book = objectMapper.readValue(bookJson, BookDto.class);
			
			if (!bookService.validate(book)) {
				return ResponseEntity.status(500).body("Existed book with the same title and author.");
			}

			// Save the image file and get the image path
			if (image != null) {
				String imagePath = saveImage(image);
				book.setImagePath(imagePath);
			}
			bookService.save(book);

			return ResponseEntity.ok(bookService.findAll());
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

	@GetMapping("/books/best-sellers")
	public List<BookDto> findTop5BestSellers() {
		return bookService.findTop5BestSellers();
	}

	@PostMapping("/rating/{bookId}/{username}")
	public void saveRating(@PathVariable String bookId, @PathVariable String username, @RequestBody Rating rating) {
		ratingService.saveVote(username, Long.valueOf(bookId), rating.getVote());
	}

	@GetMapping("/rating/{bookId}/{username}")
	public Rating getVote(@PathVariable String bookId, @PathVariable String username) {
		return new Rating(null, null, null, ratingService.getVote(username, Long.valueOf(bookId)));
	}
}
