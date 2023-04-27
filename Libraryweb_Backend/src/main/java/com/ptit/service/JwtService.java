//package com.ptit.service;
//
//import java.security.Key;
//import java.util.function.Function;
//
//import org.springframework.stereotype.Service;
//
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.io.Decoders;
//import io.jsonwebtoken.security.Keys;
//
//@Service
//public class JwtService {
//	
//	private final String SECRET_KEY = "472D4B6150645367556B58703273357638792F423F4528482B4D625165546857";
//	
//	public <T> T extractClaim(String token, Function<Claims, T> claimResolver) {
//		final Claims claims = extractAllClaims(token);
//		return claimResolver.apply(claims);
//	}
//	
//	public String extractEmail(String token) {
//		return extractClaim(token, Claims::getSubject);
//	}
//	
//	public Key getSignInKey() {
//		byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
//		return Keys.hmacShaKeyFor(keyBytes);
//	}
//
//	private Claims extractAllClaims(String token) {
//		return Jwts.parserBuilder()
//				.setSigningKey(getSignInKey())
//				.build()
//				.parseClaimsJws(token)
//				.getBody();
//	}
//}
