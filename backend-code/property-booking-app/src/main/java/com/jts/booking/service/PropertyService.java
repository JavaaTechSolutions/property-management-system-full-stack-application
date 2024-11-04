package com.jts.booking.service;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.jts.booking.dto.DeleteResponse;
import com.jts.booking.dto.SavePropertyRequest;
import com.jts.booking.dto.SavePropertyResponse;
import com.jts.booking.entity.Property;
import com.jts.booking.repo.PropertyRepository;

@Service
public class PropertyService {

	@Autowired
	private PropertyRepository propertyRepository;
	
	public SavePropertyResponse saveProperty(SavePropertyRequest request) {
		Property property = new Property();
		property.setCity(request.getCity());
		property.setState(request.getState());
		property.setCreatedDate(LocalDate.now());
		property.setLocation(request.getLocation());
		property.setPincode(request.getPincode());
		property.setPropertyTitle(request.getPropertyTitle());
		property.setPropertyTypeId(request.getPropertyTypeId());
		
		propertyRepository.save(property);
		
		SavePropertyResponse response = new SavePropertyResponse();
		response.setPropertyId(property.getPropertyId());
		response.setResponse("Property details saved successfully.");

		return response;
	}
	
	public List<Property> getAllProperty() {
		return propertyRepository.findAll();
	}
	
	public Property getPropertyById(long id) {
		return propertyRepository.findById(id).get();
	}
	
	public DeleteResponse deletePropertyById(long id) {
		propertyRepository.deleteById(id);
		
		DeleteResponse response = new DeleteResponse();
		response.setResponse("Property Details deleted successfully");
		
		return response;
	}
	
	public String savePropertyImageById(MultipartFile file, long id) throws IOException {
		Property property = propertyRepository.findById(id).get();
		property.setPhoto(file.getBytes());

		propertyRepository.save(property);

		return "File uploaded successfully into database";
	}
	
	
}
