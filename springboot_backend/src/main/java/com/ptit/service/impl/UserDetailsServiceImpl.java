//package com.ptit.service.impl;
//
//import java.util.List;
//import java.util.stream.Collectors;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.security.crypto.password.PasswordEncoder;
//
//import com.ptit.model.entity.User;
//import com.ptit.repository.UserRepository;
//
//public class UserDetailsServiceImpl implements UserDetailsService {
//
//	@Autowired
//	UserRepository userRepository;
//
//	@Autowired
//	PasswordEncoder passwordEncoder;
//
//	@Override
//	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
//		User myUser = userRepository.findByEmail(email)
//				.orElseThrow(() -> new UsernameNotFoundException("Username not found."));
//		List<GrantedAuthority> authorities = myUser.getRoles().stream()
//				.map(role -> new SimpleGrantedAuthority("ROLE_" + role.getRole())).collect(Collectors.toList());
//		return new org.springframework.security.core.userdetails.User(myUser.getEmail(),
//				passwordEncoder.encode(myUser.getPassword()), authorities);
//
//	}
//
//}
