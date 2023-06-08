package com.ptit.security.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ptit.model.entity.User;
import com.ptit.repository.UserRepository;
import com.ptit.security.auth.AuthenticationRequest;
import com.ptit.security.auth.AuthenticationResponse;
import com.ptit.security.service.AuthenticationService;
import com.ptit.service.UserRoleService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

@CrossOrigin
@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

	@Autowired
	AuthenticationService authenticationService;
	
	@Autowired
	UserRoleService userRoleService;
	
	@Autowired
	UserRepository userRepository;

	@PostMapping("/login")
	public ResponseEntity<AuthenticationResponse> login(@RequestBody AuthenticationRequest authenticationRequest) {
		AuthenticationResponse response = authenticationService.authenticate(authenticationRequest);
		if (response == null)
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		return ResponseEntity.ok(response);
	}
	
	@PostMapping("/register/user")
	public ResponseEntity<String> registerUser(@RequestBody User user) {
		if(userRepository.existsById(user.getUsername())) {
			return ResponseEntity.status(500).body("Username existed, please choose another username.");
		}
		userRoleService.registerUser(user);
		return ResponseEntity.status(200).body("Register successfully, please login again.");
	}
}
