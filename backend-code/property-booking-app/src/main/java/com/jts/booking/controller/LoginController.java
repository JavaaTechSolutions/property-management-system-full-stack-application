package com.jts.booking.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jts.booking.config.JWTService;
import com.jts.booking.dto.DashboardResponse;
import com.jts.booking.dto.LoginRequest;
import com.jts.booking.dto.LoginResponse;
import com.jts.booking.dto.SignupRequest;
import com.jts.booking.dto.SignupResponse;
import com.jts.booking.service.LoginService;

@RestController
@RequestMapping("/api")
//@CrossOrigin
public class LoginController {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JWTService jwtService;
	
	@Autowired
	private LoginService loginService;

	@PostMapping("/doLogin")
	public ResponseEntity<LoginResponse> doLogin(@RequestBody LoginRequest request) {
		LoginResponse response = new LoginResponse();

		Authentication authentication = authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

		if (authentication.isAuthenticated()) {
			response.setToken(jwtService.generateToken(request.getUsername()));
		}

		return new ResponseEntity<>(response, HttpStatus.CREATED);
	}

	@GetMapping("/dashboard")
	public ResponseEntity<DashboardResponse> dashboard() {
		DashboardResponse response = new DashboardResponse();
		response.setResponse("Success");
		
		System.out.println("Dashboard Response");
		
		return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
	@PostMapping("/doRegister")
	public ResponseEntity<SignupResponse> doRegister(@RequestBody SignupRequest request) {
		return new ResponseEntity<>(loginService.doRegister(request), HttpStatus.CREATED);
	}
}
