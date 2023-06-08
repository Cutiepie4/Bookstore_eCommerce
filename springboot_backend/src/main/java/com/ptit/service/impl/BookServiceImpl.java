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
import com.ptit.repository.CartRepository;
import com.ptit.repository.CommentRepository;
import com.ptit.repository.OrderBookRepository;
import com.ptit.repository.RatingRepository;
import com.ptit.service.BookService;
import com.ptit.service.CommentService;
import com.ptit.service.RatingService;

import jakarta.transaction.Transactional;

@Service
public class BookServiceImpl implements BookService {

	@Autowired
	ModelMapper modelMapper;

	@Autowired
	BookRepository bookRepository;

	@Autowired
	RatingService ratingService;

	@Autowired
	CommentRepository commentRepository;

	@Autowired
	CartRepository cartRepository;

	@Autowired
	OrderBookRepository orderBookRepository;

	@Override
	public List<BookDto> findAll() {
		return bookRepository.findAll().stream().map(book -> {
			BookDto bookDto = modelMapper.map(book, BookDto.class);
			bookDto.setVoters(ratingService.getVoters(book.getId()));
			bookDto.setRating(ratingService.getOverallRating(book.getId()));
			return bookDto;
		}).collect(Collectors.toList());
	}

	@Override
	public void save(BookDto book) {
		bookRepository.save(modelMapper.map(book, Book.class));
	}

	@Transactional
	@Override
	public void deleteById(Long id) {
		ratingService.deleteByBookId(id);
		commentRepository.deleteAllByBook(id);
		cartRepository.deleteById_BookId(id);
		orderBookRepository.deleteByBookId(id);
		bookRepository.deleteById(id);
	}

	@Override
	public BookDto findById(Long id) {
		Optional<Book> bookDto = bookRepository.findById(id);
		if (bookDto.isPresent()) {
			BookDto newBook = modelMapper.map(bookDto.get(), BookDto.class);
			newBook.setVoters(ratingService.getVoters(id));
			newBook.setRating(ratingService.getOverallRating(id));
			return newBook;
		}
		return new BookDto();
	}

	@Override
	public List<BookDto> findTop5BestSellers() {
		return bookRepository.findTop5BestSellers().stream().map(book -> modelMapper.map(book, BookDto.class))
				.collect(Collectors.toList());
	}

	@Override
	public boolean validate(BookDto bookDto) {
		if(bookDto.getId() != null) {
			BookDto oldBook = modelMapper.map(bookRepository.findById(bookDto.getId()), BookDto.class);
			if(bookDto.getAuthor().equals(oldBook.getAuthor()) && bookDto.getTitle().equals(oldBook.getTitle())) {
				return true;
			}
		}
		return !bookRepository.existsByTitleAndAuthor(bookDto.getTitle(), bookDto.getAuthor());
	}
}
