package com.ptit.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ptit.model.entity.UserRole;
import com.ptit.model.entity.UserRoleKey;

public interface UserRoleRepository extends JpaRepository<UserRole, UserRoleKey> {
	
	List<UserRole> findAllById_Username(String username);
}
