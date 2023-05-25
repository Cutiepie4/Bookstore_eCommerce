package com.ptit.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ptit.model.entity.Role;
import com.ptit.model.entity.User;
import com.ptit.model.entity.UserRole;
import com.ptit.repository.UserRepository;
import com.ptit.repository.UserRoleRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

	@Autowired
	UserRepository userRepository;

	@Autowired
	UserRoleRepository userRoleRepository;
	
	@Autowired
	PasswordEncoder passwordEncoder;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User myUser = userRepository.findById(username)
				.orElseThrow(() -> new UsernameNotFoundException("Username not found."));
				
		List<UserRole> listUserRole = userRoleRepository.findAllById_Username(username);
		
		List<Role> listRole = listUserRole.stream()
                .map(UserRole::getRole)
                .collect(Collectors.toList());
		
		List<GrantedAuthority> authorities = listRole.stream()
				.map(role -> new SimpleGrantedAuthority("ROLE_" + role.getRole())).collect(Collectors.toList());
		return new org.springframework.security.core.userdetails.User(myUser.getUsername(),
				passwordEncoder.encode(myUser.getPassword()), authorities);
	}
}
