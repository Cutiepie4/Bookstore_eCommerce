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

import com.ptit.model.dto.OrdersDto;
import com.ptit.service.OrdersService;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class OrdersController {

	@Autowired
	OrdersService ordersService;

	@GetMapping("/orders")
	public List<OrdersDto> getAllOrders() {
		return ordersService.findAllOrders();
	}
	
	@GetMapping("/orders/{username}")
	public List<OrdersDto> getUserOrders(@PathVariable String username) {
		return ordersService.findUserOrders(username);
	}
	
	@PostMapping("/orders/new")
	public void addOrder(@RequestBody OrdersDto ordersDto) {
		ordersService.addOrder(ordersDto);
	}

	@PutMapping("/orders/update-status")
	public void updateOrderStatus(@RequestBody OrdersDto ordersDto) {
		ordersService.changeOrderStatus(ordersDto);
	}
	
	@DeleteMapping("/orders/delete/{orderId}")
	public void deleteOrder(@PathVariable String orderId) {
		ordersService.deleteOrder(Long.valueOf(orderId));
	}
}
