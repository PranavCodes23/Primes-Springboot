package com.primes.model;

import lombok.Data;
import java.util.List;

@Data
public class DashboardData {
    private List<ZoneData> currData;
    private List<ZoneData> previousYData;
}
