package com.ptit.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ptit.model.entity.Book;

public interface BookRepository extends JpaRepository<Book, Long>{
	
	@Query(value = "SELECT TOP(5) * FROM books ORDER BY sold DESC", nativeQuery=true)
	List<Book> findTop5BestSellers();
	
	boolean existsByTitleAndAuthor(String title, String author);
}
