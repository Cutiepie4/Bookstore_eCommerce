package com.ptit.service.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ptit.model.entity.Rating;
import com.ptit.model.entity.RatingKey;
import com.ptit.repository.BookRepository;
import com.ptit.repository.RatingRepository;
import com.ptit.repository.UserRepository;
import com.ptit.service.RatingService;

@Service
public class RatingServiceImpl implements RatingService {

	@Autowired
	RatingRepository ratingRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	BookRepository bookRepository;
	
	@Override
	public void saveVote(String username, Long bookId, int vote) {
		ratingRepository.save(new Rating(new RatingKey(username, bookId), userRepository.findById(username).get(), bookRepository.findById(bookId).get(), vote));
	}

	@Override
	public Double getOverallRating(Long bookId) {
		return ratingRepository.findOverallRating(bookId);
	}

	@Override
	public int getVoters(Long bookId) {
		return ratingRepository.findVoters(bookId);
	}

	@Override
	public int getVote(String username, Long bookId) {
		Optional<Rating> rating = ratingRepository.findById(new RatingKey(username, bookId));
		if(rating.isPresent()) return rating.get().getVote();
		return 0;
	}

	@Override
	public void deleteByBookId(Long bookId) {
		ratingRepository.deleteAllByBook(bookId);
	}
	
}
