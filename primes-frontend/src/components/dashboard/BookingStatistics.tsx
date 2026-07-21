'use client';

import React from 'react';
import SummaryCards from './SummaryCards';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './BookingStatistics.module.css';

const mockBarData = [
  { date: '28', current: 16000, last: 15500 },
  { date: '29', current: 17000, last: 16500 },
  { date: '30', current: 18500, last: 17000 },
  { date: 'Jul', current: 17500, last: 17200 },
  { date: '02', current: 18000, last: 17000 },
  { date: '03', current: 16500, last: 16000 },
  // Truncated for mock
];

interface BookingStatisticsProps {
  data: any;
}

const BookingStatistics: React.FC<BookingStatisticsProps> = ({ data }) => {
  return (
    <div className={`panel ${styles.container}`}>
      <div className="panel-header">BOOKING STATISTICS</div>
      
      <div className={styles.content}>
        <div className={styles.dateFilter}>
          ALL INDIA <br/>
          <span>FROM DATE: 2026-06-28 TO DATE: 2026-07-12</span>
        </div>
        
        <SummaryCards data={data} />

        <div className={styles.chartArea}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockBarData} margin={{ top: 10, right: 0, bottom: 5, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" tick={{fontSize: 10}} />
              <YAxis tick={{fontSize: 10}} />
              <Tooltip />
              <Bar dataKey="current" fill="#00bbf9" name="Current Year" />
              <Bar dataKey="last" fill="#f45b69" name="Last Year" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default BookingStatistics;
