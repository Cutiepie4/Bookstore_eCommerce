package com.ptit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ptit.model.entity.Rating;
import com.ptit.model.entity.RatingKey;

public interface RatingRepository extends JpaRepository<Rating, RatingKey> {
	
	@Query(value = "SELECT COALESCE(AVG(CAST(vote AS decimal)), 0) FROM rating WHERE book_id = :bookId", nativeQuery = true)
	Double findOverallRating(@Param("bookId") Long bookId);
	
	@Query(value = "SELECT COUNT(username) FROM rating WHERE book_id = :bookId", nativeQuery = true)
	int findVoters(@Param("bookId") Long bookId);

}
