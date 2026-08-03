'use client';

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Brush, Label } from 'recharts';
import styles from './AdvanceReservationChart.module.css';

const mockChartData = [
  { date: '2026-07-13', day: '13', current: 90, last: 100, earningCurr: 17000, earningLast: 16000 },
  { date: '2026-07-14', day: '14', current: 65, last: 95, earningCurr: 11000, earningLast: 15500 },
  { date: '2026-07-15', day: '15', current: 60, last: 92, earningCurr: 10500, earningLast: 14500 },
  { date: '2026-07-16', day: '16', current: 55, last: 90, earningCurr: 10000, earningLast: 14000 },
  { date: '2026-07-17', day: '17', current: 56, last: 89, earningCurr: 9500, earningLast: 14000 },
  { date: '2026-07-18', day: '18', current: 55, last: 95, earningCurr: 10000, earningLast: 15500 },
  { date: '2026-07-19', day: '19', current: 55, last: 100, earningCurr: 9500, earningLast: 16000 },
  { date: '2026-07-20', day: '20', current: 45, last: 102, earningCurr: 8500, earningLast: 15800 },
  { date: '2026-07-21', day: '21', current: 40, last: 93, earningCurr: 7500, earningLast: 14800 },
  { date: '2026-07-22', day: '22', current: 38, last: 91, earningCurr: 7000, earningLast: 14000 },
  { date: '2026-07-23', day: '23', current: 37, last: 89, earningCurr: 7100, earningLast: 13800 },
  { date: '2026-07-24', day: '24', current: 43, last: 89, earningCurr: 8080, earningLast: 13900 },
  { date: '2026-07-25', day: '25', current: 42, last: 96, earningCurr: 7800, earningLast: 15800 },
  { date: '2026-07-26', day: '26', current: 45, last: 100, earningCurr: 8080, earningLast: 15500 },
  { date: '2026-07-27', day: '27', current: 35, last: 102, earningCurr: 6000, earningLast: 15500 },
  { date: '2026-07-28', day: '28', current: 30, last: 92, earningCurr: 5000, earningLast: 14500 },
];

const renderLegend = (props: any) => {
  const { payload } = props;
  return (
    <div className={styles.customLegend}>
      {payload.map((entry: any, index: number) => (
        <div key={`item-${index}`} className={styles.legendItem}>
          <span className={styles.legendColor} style={{ backgroundColor: entry.value === 'Last Year' ? '#d50000' : '#29b6f6' }}></span>
          <span>{entry.value}</span>
        </div>
      ))}
    </div>
  );
};




const CustomDot = (props: any) => {
  const { cx, cy, stroke, payload, value } = props;
  
  // Need to handle when cx/cy are undefined (e.g. animation start)
  if (cx === undefined || cy === undefined) return null;

  if (props.dataKey === 'last' || props.dataKey === 'earningLast') {
    return (
      <circle cx={cx} cy={cy} r={4} fill="#d50000" stroke="#d50000" />
    );
  }
  
  return (
    <g>
      <circle cx={cx} cy={cy} r={5} fill="#29b6f6" stroke="#29b6f6" />
      <circle cx={cx} cy={cy} r={3} fill="#fff" />
    </g>
  );
};

const AdvanceReservationChart = () => {
  return (
    <div className={`panel ${styles.container}`}>
      <div className={styles.headerStack}>
        <div className="panel-header" style={{textAlign: 'center', marginBottom: 0}}>
          ADVANCE RESERVATION PERIOD STATISTICS
        </div>
        <div className={styles.subHeaderGreen}>
          ALL INDIA
        </div>
        <div className={styles.subHeaderBlue}>
          FROM DATE :2026-07-13 TO DATE :2026-07-28
        </div>
      </div>
      
      {/* Occupancy Chart */}
      <div className={styles.chartSection}>
        <div className={styles.massiveRedBanner}>
          
          <div className={styles.bannerText}>
            <div className={styles.bannerValue}>51.66</div>
            <div className={styles.bannerLabel}>Percentage Occupancy</div>
          </div>
        </div>
        
        <div className={styles.chartBody}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockChartData} margin={{ top: 25, right: 10, bottom: 60, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" fill="#f8f9fa" />
              <XAxis dataKey="day" tick={{fontSize: 11}} tickLine={false} axisLine={{stroke: '#ccc'}}>
                <Label value="Journey date" offset={10} position="bottom" style={{ fontSize: 12, fontWeight: 'bold', fill: '#333' }} />
              </XAxis>
              <YAxis tick={{fontSize: 11, dy: 5}} tickLine={false} axisLine={{stroke: '#ccc'}} domain={[0, 150]} ticks={[0, 50, 100, 150]}>
                <Label value="Occupancy in (%)" angle={-90} position="insideLeft" dx={2} style={{ fontSize: 12, fontWeight: 'bold', fill: '#333', textAnchor: 'middle' }} />
              </YAxis>
              <Tooltip cursor={{strokeDasharray: '3 3'}} />
              <Legend content={renderLegend} verticalAlign="bottom" align="center" wrapperStyle={{ bottom: 5 }} />
              <Brush dataKey="day" height={15} stroke="#888" fill="#e0e0e0" y={0} />
              
              <Area isAnimationActive={false} type="linear" dataKey="last" name="Last Year" stroke="#d50000" strokeWidth={2} fill="#f8b6b6" fillOpacity={0.8} dot={<CustomDot />} activeDot={{r: 6}} />
              <Area isAnimationActive={false} type="linear" dataKey="current" name="Current Year" stroke="#29b6f6" strokeWidth={2} fill="#c2e6f4" fillOpacity={0.8} dot={<CustomDot />} activeDot={{r: 6}} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Earning Chart */}
      <div className={styles.chartSection}>
        <div className={styles.massivePurpleBanner}>
          <div className={styles.bannerText}>
            <div className={styles.bannerValue}>147787.81</div>
            <div className={styles.bannerLabel}>Total Earning(in Lakhs)</div>
          </div>
        </div>
        
        <div className={styles.chartBody}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockChartData} margin={{ top: 25, right: 10, bottom: 60, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" fill="#f8f9fa" />
              <XAxis dataKey="date" tick={{fontSize: 10, angle: -45, textAnchor: 'end', dy: 10}} tickLine={false} axisLine={{stroke: '#ccc'}} height={60}>
                <Label value="Journey date" offset={10} position="bottom" style={{ fontSize: 12, fontWeight: 'bold', fill: '#333' }} />
              </XAxis>
              <YAxis tick={{fontSize: 11, dy: 5}} tickLine={false} axisLine={{stroke: '#ccc'}} domain={[0, 20000]} ticks={[0, 5000, 10000, 15000, 20000]}>
                <Label value="Day Wise Earning ( in Lakhs )" angle={-90} position="insideLeft" dx={2} style={{ fontSize: 12, fontWeight: 'bold', fill: '#333', textAnchor: 'middle' }} />
              </YAxis>
              <Tooltip cursor={{strokeDasharray: '3 3'}} />
              <Legend content={renderLegend} verticalAlign="bottom" align="center" wrapperStyle={{ bottom: 5 }} />
              <Brush dataKey="date" height={15} stroke="#888" fill="#e0e0e0" y={0} />
              
              <Area isAnimationActive={false} type="linear" dataKey="earningLast" name="Last Year" stroke="#d50000" strokeWidth={2} fill="#f8b6b6" fillOpacity={0.8} dot={<CustomDot />} activeDot={{r: 6}} />
              <Area isAnimationActive={false} type="linear" dataKey="earningCurr" name="Current Year" stroke="#29b6f6" strokeWidth={2} fill="#c2e6f4" fillOpacity={0.8} dot={<CustomDot />} activeDot={{r: 6}} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdvanceReservationChart;
