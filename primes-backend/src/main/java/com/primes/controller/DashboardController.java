package com.primes.controller;

import com.primes.model.DashboardData;
import com.primes.model.ZoneData;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/v1/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {
    @Autowired
    private com.primes.repository.ZoneDataRepository zoneDataRepository;

    @PostMapping("/zone-data")
    public DashboardData getZoneData(@RequestBody(required = false) java.util.Map<String, String> payload) {
        DashboardData response = new DashboardData();
        String dateStr = (payload != null && payload.containsKey("date")) ? payload.get("date") : "2025-01-01";
        try {
            java.util.Date queryDate = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(dateStr);
            List<ZoneData> currData = zoneDataRepository.findByDate(queryDate);
            response.setCurrData(currData);
            response.setPreviousYData(new java.util.ArrayList<>());
        } catch (Exception e) {
            e.printStackTrace();
            response.setCurrData(new java.util.ArrayList<>());
            response.setPreviousYData(new java.util.ArrayList<>());
        }
        return response;
    }
    
    @PostMapping("/stats-data")
    public java.util.Map<String, Object> getStatsData(@RequestBody(required = false) java.util.Map<String, String> payload) {
        java.util.Map<String, Object> response = new java.util.HashMap<>();
        try {
            java.util.Date startDate = new java.text.SimpleDateFormat("yyyy-MM-dd").parse("2025-01-01");
            java.util.Date endDate = new java.text.SimpleDateFormat("yyyy-MM-dd").parse("2025-01-15");
            List<ZoneData> statsData = zoneDataRepository.findByDateBetweenAndBookingLoc(startDate, endDate, "ALL");
            response.put("statsData", statsData);
        } catch (Exception e) {
            e.printStackTrace();
            response.put("statsData", new java.util.ArrayList<>());
        }
        return response;
    }
}
