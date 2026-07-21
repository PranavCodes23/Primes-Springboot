'use client';

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './AdvanceReservationChart.module.css';

const mockChartData = [
  { date: '2026-07-13', current: 15000, last: 16000 },
  { date: '2026-07-15', current: 11000, last: 14000 },
  { date: '2026-07-17', current: 10000, last: 16000 },
  { date: '2026-07-19', current: 9000, last: 15000 },
  { date: '2026-07-21', current: 7000, last: 14000 },
  { date: '2026-07-23', current: 8000, last: 16000 },
  { date: '2026-07-25', current: 7500, last: 15500 },
  { date: '2026-07-27', current: 5000, last: 14500 },
];

const AdvanceReservationChart = () => {
  return (
    <div className={`panel ${styles.container}`}>
      <div className="panel-header">ADVANCE RESERVATION PERIOD STATISTICS</div>
      
      <div className={styles.chartSection}>
        <div className={styles.chartHeader}>
          <div className={styles.redBadge}>51.66 Percentage Occupancy</div>
        </div>
        <div className={styles.chartBody}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockChartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" tick={{fontSize: 10}} />
              <YAxis tick={{fontSize: 10}} />
              <Tooltip />
              <Line type="monotone" dataKey="current" stroke="#00bbf9" strokeWidth={2} dot={{r: 4}} name="Current Year" />
              <Line type="monotone" dataKey="last" stroke="#f45b69" strokeWidth={2} dot={{r: 4}} name="Last Year" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={styles.chartSection}>
        <div className={styles.chartHeader}>
          <div className={styles.purpleBadge}>147.81 Total Earning(in Lakhs)</div>
        </div>
        <div className={styles.chartBody}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockChartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" tick={{fontSize: 10}} />
              <YAxis tick={{fontSize: 10}} />
              <Tooltip />
              <Line type="monotone" dataKey="current" stroke="#00bbf9" strokeWidth={2} dot={{r: 4}} name="Current Year" />
              <Line type="monotone" dataKey="last" stroke="#f45b69" strokeWidth={2} dot={{r: 4}} name="Last Year" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdvanceReservationChart;
