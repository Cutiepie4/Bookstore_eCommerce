package com.ptit.security.service;

import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

@Service
public class JwtService {
	private final String SECRET_KEY = "123";
	private final int EXPIRED_TIME = 60 * 60 * 1000;

	public String generateToken(String username, Collection<? extends GrantedAuthority> authorities) {
		Algorithm algorithm = Algorithm.HMAC256(SECRET_KEY.getBytes());

		return JWT.create().withSubject(username)
				.withExpiresAt(new Date(System.currentTimeMillis() + EXPIRED_TIME))
				.withClaim("roles", authorities.stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
				.sign(algorithm);
	}

	public String generateRefreshToken(String username, Collection<? extends GrantedAuthority> authorities) {
		Algorithm algorithm = Algorithm.HMAC256(SECRET_KEY.getBytes());

		return JWT.create().withSubject(username)
				.withExpiresAt(new Date(System.currentTimeMillis() + EXPIRED_TIME))
				.sign(algorithm);
	}
}
