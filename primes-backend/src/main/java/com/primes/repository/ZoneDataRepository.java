package com.primes.repository;

import com.primes.model.ZoneData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface ZoneDataRepository extends JpaRepository<ZoneData, Integer> {
    List<ZoneData> findByDate(Date date);
    
    List<ZoneData> findByDateBetweenAndBookingLoc(Date startDate, Date endDate, String bookingLoc);
}
