package com.ptit.security.service;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import com.ptit.repository.UserRepository;
import com.ptit.security.auth.AuthenticationRequest;
import com.ptit.security.auth.AuthenticationResponse;

@Service
public class AuthenticationService {

	@Autowired
	UserRepository userRepository;

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserDetailsService userDetailsService;

	@Autowired
	JwtService jwtService;

	public AuthenticationResponse authenticate(AuthenticationRequest authenticationRequest) {
		// validate user, if not will throw exception
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(),
					authenticationRequest.getPassword()));
		} catch (Exception e) {
			return null;
		}

		Collection<? extends GrantedAuthority> authorities = userDetailsService
				.loadUserByUsername(authenticationRequest.getUsername()).getAuthorities();

		String jwtToken = jwtService.generateToken(authenticationRequest.getUsername(), authorities);

		String jwtRefreshToken = jwtService.generateRefreshToken(authenticationRequest.getUsername(), authorities);

		return AuthenticationResponse.builder()
				.token(jwtToken).refreshToken(jwtRefreshToken)
				.authorities(new ArrayList<>(authorities)).build();
	}
}
