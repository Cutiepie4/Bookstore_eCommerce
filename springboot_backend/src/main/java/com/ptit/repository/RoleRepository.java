package com.ptit.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ptit.model.entity.Role;

public interface RoleRepository extends JpaRepository<Role, String> {

}
