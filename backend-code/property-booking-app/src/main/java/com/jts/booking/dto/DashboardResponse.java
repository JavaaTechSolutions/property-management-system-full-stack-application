package com.jts.booking.dto;

import java.util.List;

import com.jts.booking.entity.Property;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DashboardResponse {
	private String response;
	
	private long totalProperty;

	private long totalAvailableProperty;

	private long totalBookedProperty;

	private List<Property> latestAddedProperty;

	private List<Property> latestBookedProperty;
}
