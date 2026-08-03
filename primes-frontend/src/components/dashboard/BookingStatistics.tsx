'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend , Label, Brush } from 'recharts';
import styles from './BookingStatistics.module.css';

// Removed mockBarData

const renderLegend = (props: any) => {
  const { payload } = props;
  return (
    <div className={styles.customLegend}>
      {payload.map((entry: any, index: number) => (
        <div key={`item-${index}`} className={styles.legendItem}>
          <span className={styles.legendColor} style={{ backgroundColor: entry.color }}></span>
          <span>{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

interface BookingStatisticsProps {
  data: any;
  isUtsDashboard?: boolean;
}

let barCoords: Record<string, any> = {};

const CustomBar = (props: any) => {
  const { fill, x, y, width, height, payload, barType } = props;
  
  // Need to handle when x/y are undefined (e.g. animation start)
  if (x === undefined || y === undefined || height === undefined) return null;
  
  if (payload && barType) {
    // Record the exact pixel coordinates of this bar for the tooltip to use
    barCoords[`${payload.date}_${barType}`] = { x, y, width, height };
  }
  
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} fill={fill} />
      {height > 10 && barType === 'last' && (
        <circle cx={x + width / 2} cy={y + 5} r={3} fill="#fff" stroke={fill} strokeWidth={2} />
      )}
    </g>
  );
};

const CustomTooltip = (props: any) => {
  const { active, payload, coordinate, label } = props;
  if (active && payload && payload.length) {
    const cx = coordinate?.x || 0;
    
    // Use coordinate.x to accurately know if we are in the left half since mockBarData is gone
    const isLeftHalf = cx < 400; // fallback to 400 since we don't have the global array length easily accessible
    
    // For left half, tooltips point from right of the bars (so the arrow points left)
    const pointClass = isLeftHalf ? styles.pointLeft : styles.pointRight;

    const blueEntry = payload.find((p: any) => p.dataKey === 'current');
    const redEntry = payload.find((p: any) => p.dataKey === 'last');
    
    if (!blueEntry || !redEntry) return null;
    
    // Retrieve the exact pixel coordinates recorded by CustomBar!
    const blueBar = barCoords[`${label}_current`];
    const redBar = barCoords[`${label}_last`];
    
    if (!blueBar || !redBar) return null;

    // blueBar.y and redBar.y are the EXACT top pixel edges of the rendered bars
    let blueY = blueBar.y - 11; // 11px is exactly half of the 22px tooltip height, aligning center perfectly
    let redY = redBar.y - 11;
    
    // Prevent overlap by shifting the lower bar's tooltip down slightly
    if (Math.abs(blueY - redY) < 26) {
       // The bar with the LARGER Y coordinate is visually lower on the screen.
       if (blueY > redY) {
          blueY += 24; // Shift blue tooltip down
       } else if (redY > blueY) {
          redY += 24; // Shift red tooltip down
       } else {
          // Exactly equal, just shift one
          redY += 24;
       }
    }

    return (
      <div className={styles.tooltipContainer} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1000 }}>
        {payload.map((entry: any, index: number) => {
          const valStr = entry.value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
          const isBlue = entry.dataKey === 'current';
          
          const exactTop = isBlue ? blueY : redY;
          
          let leftOffset;
          let transform;
          
          if (isLeftHalf) {
             // Tooltips point from right of the bars. Blue right edge is cx, Red right edge is cx + 12.
             leftOffset = cx + (isBlue ? 0 : 12) + 5; 
             transform = 'none';
          } else {
             // Tooltips point from left of the bars. Blue left edge is cx - 12, Red left edge is cx.
             leftOffset = cx + (isBlue ? -12 : 0) - 5;
             transform = 'translateX(-100%)';
          }

          const boxStyle: React.CSSProperties = {
            '--box-color': entry.color,
            position: 'absolute',
            whiteSpace: 'nowrap',
            top: `${exactTop}px`,
            left: `${leftOffset}px`,
            transform: transform,
          } as React.CSSProperties;

          return (
            <div 
              key={index} 
              className={`${styles.tooltipBox} ${pointClass}`} 
              style={boxStyle}
            >
              <span className={styles.tooltipText}>{entry.name} :&nbsp;</span>
              <span className={styles.tooltipValue}>{valStr}</span>
            </div>
          );
        })}
      </div>
    );
  }
  return null;
};



const BookingStatistics: React.FC<BookingStatisticsProps> = ({ data, isUtsDashboard = false }) => {
  // Map database data to Recharts format
  // We use the last 15 days of data (e.g. Jan 1 to Jan 15)
  // For 'last' year, since we don't have 2024 data, we mock it visually as 90% of current year
  const chartData = React.useMemo(() => {
    if (!data || !Array.isArray(data)) return [];
    return data.map((d: any) => {
      const dateObj = new Date(d.date);
      const day = dateObj.getDate().toString().padStart(2, '0');
      const month = dateObj.toLocaleString('en-US', { month: 'short' });
      // Show month name for the 1st of the month
      const label = day === '01' ? month : day;
      return {
        date: label,
        current: Number((d.earning / 100000).toFixed(2)), // Convert to Lakhs
        last: Number((d.earning * 0.9 / 100000).toFixed(2)) // Mock 2024 as 90% of 2025
      };
    });
  }, [data]);

  // Use the most recent day's data (Jan 15) for the banners
  const latestData = data && data.length > 0 ? data[data.length - 1] : null;
  const netPsgn = latestData ? (latestData.psgnbkg - latestData.psgncanc) / 1000 : 0;
  const netTkt = latestData ? (latestData.tktbkd - latestData.tktcan) / 1000 : 0;
  const totalEarning = latestData ? latestData.earning / 100000 : 0;

  return (
    <div className={`panel ${styles.container}`} style={isUtsDashboard ? { border: 'none', boxShadow: 'none' } : {}}>
      {isUtsDashboard ? (
        <div className={styles.headerStack}>
          <div style={{ background: '#a0e4e6', color: '#10394a', fontWeight: 'bold', padding: '8px', textAlign: 'center', fontSize: '15px' }}>
            BOOKING STATISTICS(UTS)
          </div>
          <div style={{ background: '#dcf4f5', color: '#10394a', fontWeight: 'bold', padding: '6px', textAlign: 'center', fontSize: '13px' }}>
            FROM DATE :2025-01-01 TO DATE :2025-01-15
          </div>
        </div>
      ) : (
        <div className={styles.headerStack}>
          <div className="panel-header" style={{textAlign: 'center', marginBottom: 0}}>
            BOOKING STATISTICS
          </div>
          <div className={styles.subHeaderGreen}>
            ALL INDIA
          </div>
          <div className={styles.subHeaderBlue}>
            FROM DATE :2025-01-01 TO DATE :2025-01-15
          </div>
        </div>
      )}
      
      <div className={isUtsDashboard ? styles.bannersSectionHorizontal : styles.bannersSectionVertical}>
        <div className={styles.massiveBlueBanner} style={isUtsDashboard ? { backgroundColor: '#4dd0e1', color: 'white', flex: 1 } : {}}>
          <div className={styles.bannerText}>
            <div className={styles.bannerValue} style={isUtsDashboard ? { fontSize: '24px' } : {}}>
              {netPsgn.toFixed(2)}
            </div>
            <div className={styles.bannerLabel}>Net Passengers booked(Thousand)</div>
          </div>
        </div>
        
        <div className={styles.massiveRedBanner} style={isUtsDashboard ? { backgroundColor: '#d4b455', color: 'white', flex: 1 } : {}}>
          <div className={styles.bannerText}>
            <div className={styles.bannerValue} style={isUtsDashboard ? { fontSize: '24px' } : {}}>
              {netTkt.toFixed(2)}
            </div>
            <div className={styles.bannerLabel}>Net Tickets booked(Thousands)</div>
          </div>
        </div>
        
        <div className={styles.massivePurpleBanner} style={isUtsDashboard ? { backgroundColor: '#ef5350', color: 'white', flex: 1 } : {}}>
          <div className={styles.bannerText}>
            <div className={styles.bannerValue} style={isUtsDashboard ? { fontSize: '24px' } : {}}>
              {totalEarning.toFixed(2)}
            </div>
            <div className={styles.bannerLabel}>☑ Total Earnings(Lakhs)</div>
          </div>
        </div>
      </div>

      <div style={isUtsDashboard ? { height: 350, marginTop: '20px', width: '100%' } : { flex: 1, minHeight: 300, position: 'relative', width: '100%' }}>
        <ResponsiveContainer width="100%" height={isUtsDashboard ? 350 : "100%"}>
          <BarChart data={chartData} margin={{ top: 25, right: 10, bottom: 60, left: 0 }} barGap={0} barCategoryGap="25%">
            <XAxis dataKey="date" tick={{fontSize: 10, dy: 5}} tickLine={false} axisLine={{stroke: '#ccc'}}>
              <Label value="Journey date" offset={10} position="bottom" style={{ fontSize: 12, fontWeight: 'bold', fill: '#333' }} />
            </XAxis>
            <YAxis tick={{fontSize: 10, dy: 5}} tickLine={false} axisLine={{stroke: '#ccc'}} domain={['auto', 'auto']}>
              <Label value="Earning (in Lakhs)" angle={-90} position="insideLeft" dx={2} style={{ fontSize: 12, fontWeight: 'bold', fill: '#333', textAnchor: 'middle' }} />
            </YAxis>
            <Tooltip content={<CustomTooltip />} cursor={false} position={{ x: 0, y: 0 }} />
            <Brush dataKey="date" height={15} stroke="#888" fill="#e0e0e0" y={0} />
            <Legend content={renderLegend} verticalAlign="bottom" align="center" wrapperStyle={{ bottom: 5 }} />
            
            <Bar isAnimationActive={false} dataKey="current" name="Current Year" fill="#4dd0e1" barSize={12} shape={<CustomBar barType="current" />} />
            <Bar isAnimationActive={false} dataKey="last" name="Last Year" fill="#f44336" barSize={12} shape={<CustomBar barType="last" />} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BookingStatistics;
