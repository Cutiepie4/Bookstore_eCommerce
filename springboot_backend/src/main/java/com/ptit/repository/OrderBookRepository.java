package com.ptit.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ptit.model.entity.OrderBook;

public interface OrderBookRepository extends JpaRepository<OrderBook, Long> {

	void deleteByOrdersId(Long ordersId);
	
	void deleteByBookId(Long bookId);

	List<OrderBook> findByOrdersId(Long ordersId);
}
