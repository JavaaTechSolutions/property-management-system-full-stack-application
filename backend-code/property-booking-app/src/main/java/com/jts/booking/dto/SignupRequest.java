package com.jts.booking.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignupRequest {

	private String name;

	private String username;
	
	private String password;
	
	private String address;
	
	private String mobileno;
	
	private String age;

}
