package com.ptit.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ptit.model.dto.CommentDto;
import com.ptit.model.entity.Comment;
import com.ptit.service.CommentService;
import com.ptit.service.RatingService;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class CommentController {

	@Autowired
	CommentService commentService;

	@Autowired
	RatingService ratingService;

	@Autowired
	ModelMapper modelMapper;

	@GetMapping("/comments/{bookId}")
	public List<CommentDto> getBookComments(@PathVariable String bookId) {
		return commentService.findCommentsByBookId(Long.valueOf(bookId)).stream().map(comment -> {
			CommentDto newComment = modelMapper.map(comment, CommentDto.class);
			newComment.setVote(ratingService.getVote(comment.getUser().getUsername(), Long.valueOf(bookId)));
			return newComment;
		}).collect(Collectors.toList());
	}

	@PostMapping("/comments/{bookId}/{username}")
	public CommentDto postComment(@PathVariable String bookId, @PathVariable String username,
			@RequestBody Comment comment) {
		CommentDto newComment = modelMapper.map(
				commentService.postComment(username, Long.valueOf(bookId), comment.getComment()), CommentDto.class);
		newComment.setVote(ratingService.getVote(username, Long.valueOf(bookId)));
		return newComment;
	}

	@DeleteMapping("/comments/{commentId}")
	public void deleteComment(@PathVariable String commentId) {
		commentService.deleteComment(Long.valueOf(commentId));
	}
}
