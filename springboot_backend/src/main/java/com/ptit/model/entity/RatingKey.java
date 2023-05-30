package com.ptit.model.entity;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RatingKey implements Serializable {/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Column(name = "username")
	String username;
	
	@Column(name = "book_id")
	Long bookId;

	@Override
	public boolean equals(Object obj) {
		RatingKey ck = (RatingKey) obj;
		return ck.username.equals(username) && ck.bookId == bookId;
	}

	@Override
	public int hashCode() {
		// TODO Auto-generated method stub
		return super.hashCode();
	}

}
