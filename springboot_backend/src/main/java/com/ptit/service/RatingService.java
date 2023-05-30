package com.ptit.service;

import org.springframework.stereotype.Service;

@Service
public interface RatingService {
	
	void saveVote(String username, Long bookId, int vote);
	
	Double getOverallRating(Long bookId);
	
	int getVoters(Long bookId);
	
	int getVote(String username, Long bookId);
}
