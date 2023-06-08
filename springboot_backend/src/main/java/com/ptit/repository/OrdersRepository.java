package com.ptit.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ptit.model.entity.Orders;

public interface OrdersRepository extends JpaRepository<Orders, Long>{
	
	List<Orders> findByUser_Username(String username);
}
