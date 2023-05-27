package com.ptit.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ptit.model.entity.Role;
import com.ptit.model.entity.User;
import com.ptit.model.entity.UserRole;
import com.ptit.model.entity.UserRoleKey;
import com.ptit.repository.RoleRepository;
import com.ptit.repository.UserRepository;
import com.ptit.repository.UserRoleRepository;
import com.ptit.service.UserRoleService;

@Service
public class UserRoleServiceImpl implements UserRoleService {
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	UserRoleRepository userRoleRepository;
	
	@Autowired
	RoleRepository roleRepository;

	@Override
	public void registerUser(User user) {
		Role role = roleRepository.findById("USER").get();
		userRepository.save(user);
		userRoleRepository.save(new UserRole(new UserRoleKey(user.getUsername(), role.getRole()), user, role));
	}
}
