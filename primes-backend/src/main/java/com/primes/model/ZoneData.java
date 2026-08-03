package com.primes.model;

import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import jakarta.persistence.*;
import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "zonedata")
public class ZoneData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Temporal(TemporalType.DATE)
    private Date date;

    @Column(name = "booking_loc")
    @com.fasterxml.jackson.annotation.JsonProperty("booking_loc")
    private String bookingLoc;
    
    private long tktbkd;
    private long psgnbkg;
    private double earning;
    private double refund;
    private double net;
    private long tktcan;
    private long psgncanc;
    private String loadingtime;
}
