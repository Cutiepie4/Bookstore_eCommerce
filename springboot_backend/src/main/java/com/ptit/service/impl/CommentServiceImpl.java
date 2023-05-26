package com.ptit.service.impl;

import java.sql.Date;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ptit.model.entity.Comment;
import com.ptit.repository.BookRepository;
import com.ptit.repository.CommentRepository;
import com.ptit.repository.UserRepository;
import com.ptit.service.CommentService;

@Service
public class CommentServiceImpl implements CommentService {

	@Autowired
	ModelMapper modelMapper;

	@Autowired
	CommentRepository commentRepository;

	@Autowired
	UserRepository userRepository;

	@Autowired
	BookRepository bookRepository;

	@Override
	public List<Comment> findCommentsByBookId(Long bookId) {
		return commentRepository.findByBookId(bookId);
	}

	@Override
	public Comment postComment(String username, Long bookId, String comment) {
		java.util.Date utilDate = java.util.Calendar.getInstance().getTime();
		Date sqlDate = new Date(utilDate.getTime());
		Comment newComment = new Comment(null, userRepository.findById(username).get(),
				bookRepository.findById(bookId).get(), comment, sqlDate);
		commentRepository.save(newComment);
		return newComment;
	}

	@Override
	public void deleteComment(Long commentId) {
		commentRepository.deleteById(commentId);
	}
}
