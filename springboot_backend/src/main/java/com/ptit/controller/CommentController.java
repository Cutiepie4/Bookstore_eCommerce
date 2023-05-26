package com.ptit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ptit.model.entity.Comment;
import com.ptit.service.CommentService;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class CommentController {

	@Autowired
	CommentService commentService;

	@GetMapping("/comments/{bookId}")
	public List<Comment> getBookComments(@PathVariable String bookId) {
		return commentService.findCommentsByBookId(Long.valueOf(bookId));
	}

	@PostMapping("/comments/{bookId}/{username}")
	public Comment postComment(@PathVariable String bookId, @PathVariable String username, @RequestBody String comment) {
		Comment newComment = commentService.postComment(username, Long.valueOf(bookId), comment.substring(1, comment.length() - 1));
		return newComment;
	}

	@DeleteMapping("/comments/{commentId}")
	public void deleteComment(@PathVariable String commentId) {
		commentService.deleteComment(Long.valueOf(commentId));
	}
}
