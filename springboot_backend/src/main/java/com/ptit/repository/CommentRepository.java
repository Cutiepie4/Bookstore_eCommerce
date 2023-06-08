package com.ptit.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ptit.model.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {
	
	List<Comment> findByBookId(Long bookId);
	
	@Modifying
	@Query(value = "DELETE FROM comments WHERE book_id = :bookId", nativeQuery = true)
	void deleteAllByBook(@Param("bookId") Long bookId);
}
