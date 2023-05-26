package com.ptit.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ptit.model.entity.Comment;

@Service
public interface CommentService {
	List<Comment> findCommentsByBookId(Long bookId);
	
	Comment postComment(String username, Long bookId, String comment);
	
	void deleteComment(Long commentId);
}
