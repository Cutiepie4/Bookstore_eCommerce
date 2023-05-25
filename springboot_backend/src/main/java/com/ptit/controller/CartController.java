package com.ptit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ptit.model.dto.CartDto;
import com.ptit.service.CartService;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class CartController {
	
	@Autowired
	CartService cartService;
	
	@GetMapping("/carts/{username}")
	public List<CartDto> getAllCarts(@PathVariable("username") String username) {
		return cartService.findAllByUsername(username);
	}
	
	@PostMapping("/carts/{username}")
	public void addCart(@PathVariable("username") String username, @RequestBody CartDto newCart) {
		cartService.save(username, newCart);
	}
	
	@PutMapping("/carts/{username}")
	public void updateCart(@PathVariable("username") String username, @RequestBody CartDto newCart) {
		cartService.save(username, newCart);
	}
	
	@DeleteMapping("/carts/{username}")
	public void deleteCart(@PathVariable("username") String username, @RequestBody CartDto newCart) {
		if(newCart != null) {
			cartService.deleteByCartKey(username, newCart);
		}
		else cartService.deleteByUsername(username);
	}
}
