package com.jts.booking.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jts.booking.entity.Property;

public interface PropertyRepository extends JpaRepository<Property, Long> {

}
