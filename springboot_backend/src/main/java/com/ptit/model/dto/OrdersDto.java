package com.ptit.model.dto;

import java.sql.Timestamp;
import java.util.List;

import com.ptit.model.entity.OrderBook;
import com.ptit.model.entity.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrdersDto {
	private Long id;

	private User user;

	private String name, address, phoneNumber;

	private List<OrderBook> listOrderBooks;

	private Timestamp time;

	private String orderStatus;
	
	private String paymentStatus;
}
