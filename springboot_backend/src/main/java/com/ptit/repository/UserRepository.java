package com.ptit.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ptit.model.entity.User;

public interface UserRepository extends JpaRepository<User, String> {
	
}
