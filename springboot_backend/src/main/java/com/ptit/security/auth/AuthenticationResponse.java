package com.ptit.security.auth;

import java.util.ArrayList;

import org.springframework.security.core.GrantedAuthority;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {
	private String token;
	private String refreshToken;
	private ArrayList<GrantedAuthority> authorities;
}
