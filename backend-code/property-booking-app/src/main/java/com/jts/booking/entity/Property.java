package com.jts.booking.entity;

import java.sql.Blob;
import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "property")
public class Property {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "property_id")
	private long propertyId;

	@Column(name = "property_title")
	private String propertyTitle;

	@Column(name = "location")
	private String location;

	@Column(name = "property_type")
	private String propertyTypeId;

	@Column(name = "city")
	private String city;

	@Column(name = "pincode")
	private String pincode;

	@Column(name = "state")
	private String state;

	@Column(name = "is_booked")
	private String isBooked;

	@Lob
	private Blob photo;

	@Column(name = "created_date")
	private LocalDate createdDate;
}
