package com.ptit.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ptit.model.dto.OrdersDto;

@Service
public interface OrdersService {
	List<OrdersDto> findAllOrders();
	
	List<OrdersDto> findUserOrders(String username);
	
	void addOrder(OrdersDto ordersDto);
	
	void changeOrderStatus(OrdersDto ordersDto);
	
	void deleteOrder(Long ordersId);
}
