package com.ptit.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ptit.model.entity.Book;

public interface BookRepository extends JpaRepository<Book, Long>{

}
