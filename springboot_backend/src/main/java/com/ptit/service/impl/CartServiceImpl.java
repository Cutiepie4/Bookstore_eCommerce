package com.ptit.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ptit.model.dto.CartDto;
import com.ptit.model.entity.Cart;
import com.ptit.model.entity.CartKey;
import com.ptit.repository.CartRepository;
import com.ptit.repository.UserRepository;
import com.ptit.service.CartService;

@Service
public class CartServiceImpl implements CartService {

	@Autowired
	ModelMapper modelMapper;

	@Autowired
	CartRepository cartRepository;

	@Autowired
	UserRepository userRepository;

	@Override
	public void save(String username, CartDto cart) {
		cartRepository.save(new Cart(new CartKey(username, cart.getBook().getId()), userRepository.findById(username).get(),
				cart.getBook(), cart.getQuantity()));
	}

	@Override
	public void deleteByUsername(String username) {
		cartRepository.deleteById_Username(username);
	}

	@Override
	public void deleteByCartKey(String username, CartDto cart) {
		cartRepository.deleteById(new CartKey(username, cart.getBook().getId()));
	}

	@Override
	public List<CartDto> findAllByUsername(String username) {
		return cartRepository.findAllById_Username(username).stream().map(cart -> modelMapper.map(cart, CartDto.class))
				.collect(Collectors.toList());
	}

}
