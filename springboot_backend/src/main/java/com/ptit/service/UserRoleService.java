package com.ptit.service;

import org.springframework.stereotype.Service;

import com.ptit.model.entity.User;

@Service
public interface UserRoleService {
	
	void registerUser(User user);
}
