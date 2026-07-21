'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import styles from './DistributionRow.module.css';

const systemVsInternetData = [
  { name: 'INTERNET TICKET', value: 90.07 },
  { name: 'SYSTEM TICKET', value: 9.93 },
];

const cashVsCashlessData = [
  { name: 'CASHLESS', value: 85.26 },
  { name: 'CASH', value: 14.74 },
];

const zoneShareData = [
  { name: 'CR', value: 7.80 },
  { name: 'EC', value: 7.72 },
  { name: 'EO', value: 2.76 },
  { name: 'ER', value: 6.02 },
  { name: 'KR', value: 0.57 },
  { name: 'NC', value: 3.17 },
  { name: 'NE', value: 4.88 },
  { name: 'NF', value: 7.32 },
  { name: 'NR', value: 11.14 },
  { name: 'NW', value: 3.90 },
  { name: 'SB', value: 3.66 },
  { name: 'SC', value: 4.88 },
  { name: 'SE', value: 3.90 },
  { name: 'SO', value: 4.55 },
  { name: 'SR', value: 10.00 },
  { name: 'SW', value: 4.39 },
  { name: 'WC', value: 3.50 },
  { name: 'WR', value: 9.84 },
];

const COLORS = ['#f4ca3c', '#9ed2f4']; 
const COLORS_PIE2 = ['#9ed2f4', '#f4ca3c'];
const COLORS_PIE3 = [
  '#4fc3f7', '#e53935', '#4caf50', '#1e88e5', '#8e24aa', '#cddc39', '#fb8c00', '#00bcd4', 
  '#d81b60', '#fdd835', '#009688', '#8d6e63', '#9c27b0', '#ff9800', '#3f51b5', '#4caf50', 
  '#ffeb3b', '#e91e63'
];

// Custom label layout
const renderCustomLabel = (props: any) => {
  const { cx, cy, midAngle, value, name, index } = props;
  const RADIAN = Math.PI / 180;
  
  // Match radius to outerRadius to start line on edge
  const radius = 60; 
  
  // Point 1: Edge of pie chart
  const sx = cx + radius * Math.cos(-midAngle * RADIAN);
  const sy = cy + radius * Math.sin(-midAngle * RADIAN);
  
  // Split labels: right side vs left side
  const isRightSide = index <= 8;
  
  // Space labels on Y axis
  let ty;
  if (isRightSide) {
    // Top-to-bottom on the right side
    ty = cy - 90 + (index * 22.5);
  } else {
    // Bottom-to-top on the left side
    ty = cy + 90 - ((index - 9) * 22.5);
  }
  
  // Point 2: The elbow. It pushes out horizontally a fixed distance.
  const elbowX = isRightSide ? cx + 75 : cx - 75;
  
  // Point 3: The text start point.
  const tx = isRightSide ? cx + 90 : cx - 90;

  return (
    <g>
      {/* 2-segment line: Edge -> Elbow -> Text */}
      <path 
        d={`M${sx},${sy} L${elbowX},${ty} L${tx},${ty}`} 
        stroke="#888" 
        strokeWidth={1}
        fill="none" 
      />
      <text 
        x={tx + (isRightSide ? 5 : -5)} 
        y={ty} 
        fill="#333" 
        textAnchor={isRightSide ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={10.5}
        fontWeight={500}
      >
        {`${name}: ${value.toFixed(2)}%`}
      </text>
    </g>
  );
};

const DistributionRow = () => {
  return (
    <div className={styles.row}>
      <div className={`panel ${styles.panel}`}>
        <div className="panel-header">SYSTEM VS. INTERNET TICKETS</div>
        <div className={styles.chartContainer}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={systemVsInternetData} dataKey="value" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                {systemVsInternetData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={`panel ${styles.panel}`}>
        <div className="panel-header">CASH VS. CASHLESS TICKETS</div>
        <div className={styles.chartContainer}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={cashVsCashlessData} dataKey="value" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                {cashVsCashlessData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS_PIE2[index % COLORS_PIE2.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={`panel ${styles.panel}`}>
        <div className="panel-header">ZONE-WISE EARNING SHARE</div>
        <div className={styles.chartContainer}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
              <Pie 
                data={zoneShareData} 
                dataKey="value" 
                cx="50%" 
                cy="50%" 
                startAngle={90}
                endAngle={-270}
                outerRadius={60} 
                labelLine={false}
                label={renderCustomLabel}
              >
                {zoneShareData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS_PIE3[index % COLORS_PIE3.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => [`${value}%`, 'Share']} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DistributionRow;
