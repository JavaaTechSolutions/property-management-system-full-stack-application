package com.jts.booking.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.jts.booking.dto.DeleteResponse;
import com.jts.booking.dto.SavePropertyRequest;
import com.jts.booking.dto.SavePropertyResponse;
import com.jts.booking.entity.Property;
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

	@GetMapping("/getAllProperty")
	public ResponseEntity<List<Property>> getAllProperty() {
		return new ResponseEntity<>(propertyService.getAllProperty(), HttpStatus.CREATED);
	}
	
	@GetMapping("/getPropertyById")
	public ResponseEntity<Property> getPropertyById(@RequestParam long id) {
		return new ResponseEntity<>(propertyService.getPropertyById(id), HttpStatus.OK);
	}

	@DeleteMapping("/deletePropertyById")
	public ResponseEntity<DeleteResponse> deletePropertyById(@RequestParam long id) {
		return new ResponseEntity<>(propertyService.deletePropertyById(id), HttpStatus.CREATED);
	}
	
	@PostMapping("/uploadFilesIntoDB")
	public ResponseEntity<String> storeFilesIntoDB(@RequestParam("file") MultipartFile file, @RequestParam long id) throws IOException {
		propertyService.savePropertyImageById(file, id);

		return ResponseEntity.status(HttpStatus.OK).body("Success");
	}

}
