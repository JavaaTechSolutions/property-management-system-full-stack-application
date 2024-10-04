package com.jts.booking.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SavePropertyRequest {
	private long propertyId;

	private String propertyTitle;

	private String location;

	private String propertyTypeId;

	private String city;

	private String pincode;

	private String state;

	private String createdDate;
}
