package com.primes.controller;

import com.primes.model.DashboardData;
import com.primes.model.ZoneData;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/v1/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {

    @PostMapping("/getAllZoneData")
    public DashboardData getAllZoneData() {
        // Returning mock data mirroring the legacy JS
        
        ZoneData allIndiaCurr = ZoneData.builder()
            .booking_loc("ALL")
            .tktbkd(1968310)
            .psgnbkg(3102119)
            .earning(2500463788L)
            .refund(479282633L)
            .net(2021181155L)
            .tktcan(419698)
            .psgncanc(658324)
            .loadingtime("2026-07-15 13:08")
            .build();
            
        ZoneData allIndiaPrev = ZoneData.builder()
            .booking_loc("ALL")
            .tktbkd(590000)
            .psgnbkg(1050000)
            .earning(8900000)
            .refund(75000)
            .net(710000)
            .tktcan(120000)
            .psgncanc(20000)
            .build();

        DashboardData response = new DashboardData();
        response.setCurrData(Arrays.asList(allIndiaCurr));
        response.setPreviousYData(Arrays.asList(allIndiaPrev));

        return response;
    }
}
