package com.jts.booking.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jts.booking.dto.DashboardResponse;
import com.jts.booking.entity.Property;
import com.jts.booking.repo.PropertyRepository;

@Service
public class DashboardService {

	@Autowired
	private PropertyRepository propertyRepository;

	public DashboardResponse getDashboardData() {
		DashboardResponse response = new DashboardResponse();
		response.setResponse("Success");
		response.setLatestAddedProperty(getAllProperty());
		response.setLatestBookedProperty(getAllProperty());
		response.setTotalAvailableProperty(1);
		response.setTotalBookedProperty(1);
		response.setTotalProperty(propertyRepository.count());
		return response;
	}

	private List<Property> getAllProperty() {
		return propertyRepository.findAll();
	}

}
