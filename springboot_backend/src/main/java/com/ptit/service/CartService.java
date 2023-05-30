package com.ptit.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ptit.model.dto.CartDto;
import com.ptit.model.entity.CartKey;

@Service
public interface CartService {
	
	List<CartDto> findAllByUsername(String username);
	
	CartDto save(String username, CartDto cart);
	
	void deleteByUsername(String username);

	void deleteByCartKey(String username, CartDto cart);
}
