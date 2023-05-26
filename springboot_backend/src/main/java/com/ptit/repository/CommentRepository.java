package com.ptit.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ptit.model.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {
	
	List<Comment> findByBookId(Long bookId);
}
