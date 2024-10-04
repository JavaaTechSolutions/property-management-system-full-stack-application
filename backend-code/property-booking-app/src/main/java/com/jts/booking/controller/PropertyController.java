package com.jts.booking.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jts.booking.dto.SavePropertyRequest;
import com.jts.booking.dto.SavePropertyResponse;
import com.jts.booking.service.PropertyService;

@RestController
@RequestMapping("/api")
public class PropertyController {
	
	@Autowired
	private PropertyService propertyService;

	@PostMapping("/savePropertyDetails")
	public ResponseEntity<SavePropertyResponse> savePropertyDetails(@RequestBody SavePropertyRequest request) {
		return new ResponseEntity<>(propertyService.saveProperty(request), HttpStatus.CREATED);
	}
}
