package com.ptit.service.impl;

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ptit.model.dto.OrdersDto;
import com.ptit.model.entity.Book;
import com.ptit.model.entity.OrderBook;
import com.ptit.model.entity.Orders;
import com.ptit.repository.BookRepository;
import com.ptit.repository.OrderBookRepository;
import com.ptit.repository.OrdersRepository;
import com.ptit.repository.UserRepository;
import com.ptit.service.CartService;
import com.ptit.service.OrdersService;

import jakarta.transaction.Transactional;

@Service
public class OrdersServiceImpl implements OrdersService {

	@Autowired
	ModelMapper modelMapper;

	@Autowired
	OrdersRepository ordersRepository;

	@Autowired
	UserRepository userRepository;

	@Autowired
	BookRepository bookRepository;

	@Autowired
	OrderBookRepository orderBookRepository;

	@Autowired
	CartService cartService;

	@Override
	public List<OrdersDto> findAllOrders() {
		return ordersRepository.findAll().stream().map(order -> {
			OrdersDto ordersDto = modelMapper.map(order, OrdersDto.class);
			ordersDto.getUser().setPassword(null);
			ordersDto.setListOrderBooks(orderBookRepository.findByOrdersId(ordersDto.getId()));
			return ordersDto;
		}).collect(Collectors.toList());
	}

	@Transactional
	@Override
	public void addOrder(OrdersDto ordersDto) {
		Orders order = new Orders();
		order.setUser(userRepository.findById(ordersDto.getUser().getUsername()).get());
		order.setName(ordersDto.getName());
		order.setPhoneNumber(ordersDto.getPhoneNumber());
		order.setAddress(ordersDto.getAddress());
		order.setOrderStatus(ordersDto.getOrderStatus());
		order.setPaymentStatus(ordersDto.getPaymentStatus());
		order.setTime(new Timestamp(System.currentTimeMillis()));
		ordersRepository.save(order);

		ordersDto.getListOrderBooks().stream().forEach(cart -> {
			Book book = bookRepository.findById(cart.getBook().getId()).get();
			OrderBook orderBook = new OrderBook(null, order, book,
					cart.getQuantity());
			orderBookRepository.save(orderBook);
		});
		
		cartService.deleteByUsername(ordersDto.getUser().getUsername());
	}

	@Transactional
	@Override
	public void changeOrderStatus(OrdersDto ordersDto) {
		Orders orders = ordersRepository.findById(ordersDto.getId()).get();
		orders.setOrderStatus(ordersDto.getOrderStatus());
		ordersRepository.save(orders);
		if(orders.getOrderStatus().equals("Delivered")) {
			List<OrderBook> orderedBook = orderBookRepository.findByOrdersId(orders.getId());
			orderedBook.forEach(orderBook -> {
				Book book = bookRepository.findById(orderBook.getBook().getId()).get();
				book.setSold(book.getSold() + orderBook.getQuantity());
				bookRepository.save(book);
			});
		}
	}

	@Transactional
	@Override
	public void deleteOrder(Long ordersId) {
		orderBookRepository.deleteByOrdersId(ordersId);
		ordersRepository.deleteById(ordersId);
	}

	@Override
	public List<OrdersDto> findUserOrders(String username) {
		return ordersRepository.findByUser_Username(username).stream().map(order -> {
			OrdersDto ordersDto = modelMapper.map(order, OrdersDto.class);
			ordersDto.getUser().setPassword(null);
			ordersDto.setListOrderBooks(orderBookRepository.findByOrdersId(ordersDto.getId()));
			return ordersDto;
		}).collect(Collectors.toList());
	}
}
