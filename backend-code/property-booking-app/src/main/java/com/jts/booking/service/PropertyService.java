package com.jts.booking.service;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jts.booking.dto.SavePropertyRequest;
import com.jts.booking.dto.SavePropertyResponse;
import com.jts.booking.entity.Property;
import com.jts.booking.repo.PropertyRepository;

@Service
public class PropertyService {

	@Autowired
	private PropertyRepository peopPropertyRepository;
	
	public SavePropertyResponse saveProperty(SavePropertyRequest request) {
		Property property = new Property();
		property.setCity(request.getCity());
		property.setState(request.getState());
		property.setCreatedDate(LocalDate.now());
		property.setLocation(request.getLocation());
		property.setPincode(request.getPincode());
		property.setPropertyTitle(request.getPropertyTitle());
		property.setPropertyTypeId(request.getPropertyTypeId());
		
		peopPropertyRepository.save(property);
		
		SavePropertyResponse response = new SavePropertyResponse();
		response.setPropertyId(property.getPropertyId());
		response.setResponse("Property details saved successfully.");

		return response;
		
	}
}
