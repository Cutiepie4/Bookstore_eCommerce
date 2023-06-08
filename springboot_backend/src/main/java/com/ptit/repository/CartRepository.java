package com.ptit.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ptit.model.entity.Cart;
import com.ptit.model.entity.CartKey;

public interface CartRepository extends JpaRepository<Cart, CartKey> {
	
	List<Cart> findAllById_Username(String username);
	
	void deleteById_Username(String username);
	
	void deleteById_BookId(Long bookId);
}
