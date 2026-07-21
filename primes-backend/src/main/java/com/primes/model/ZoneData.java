package com.primes.model;

import lombok.Data;
import lombok.Builder;

@Data
@Builder
public class ZoneData {
    private String booking_loc;
    private long tktbkd;
    private long psgnbkg;
    private long earning;
    private long refund;
    private long net;
    private long tktcan;
    private long psgncanc;
    private String loadingtime;
}
