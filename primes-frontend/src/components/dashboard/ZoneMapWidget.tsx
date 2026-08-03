'use client';

import React, { useState } from 'react';
import styles from './ZoneMapWidget.module.css';
import { Ticket, Users, IndianRupee } from 'lucide-react';
import { ZoneMap } from '../ZoneMap/ZoneMap';
import { useRouter } from 'next/navigation';

interface ZoneMapProps {
  data: any;
}

const ZoneMapWidget: React.FC<ZoneMapProps> = ({ data }) => {
  const [hoveredZoneId, setHoveredZoneId] = useState<string | null>(null);
  const router = useRouter();
  
  // The user requested to cycle through the first three metrics:
  const metricsCycle: Array<'tktbkd' | 'tktcan' | 'psgnbkg'> = ['tktbkd', 'tktcan', 'psgnbkg'];
  const [metricIndex, setMetricIndex] = useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setMetricIndex((prev) => (prev + 1) % metricsCycle.length);
    }, 3000); // 3 seconds per metric
    return () => clearInterval(interval);
  }, []);

  const displayData = data?.currData?.find((d: any) => d.booking_loc === 'ALL') || {};

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-IN').format(num || 0);
  };

  return (
    <div 
      className={`panel ${styles.container}`} 
      onClick={() => router.push('/zonemap')}
      style={{ cursor: 'pointer' }}
    >
      <div className={styles.headerStack}>
        <div className="panel-header" style={{textAlign: 'center', marginBottom: 0}}>
          ZONE MAP
        </div>
        <div className={styles.subHeaderGreen}>
          ALL INDIA
        </div>
        <div className={styles.subHeaderBlue}>
          ON DATE : 2026-07-13
        </div>
      </div>
      
      <div className={styles.mapArea} style={{ height: '550px' }}>
        <ZoneMap 
          onZoneHover={(id) => setHoveredZoneId(id)}
          onZoneLeave={() => setHoveredZoneId(null)}
          data={data}
          selectedMetric={metricsCycle[metricIndex]}
        />
      </div>

      <div className={styles.metricsGrid}>
        <div className={styles.metricItem}>
          <div className={`${styles.iconCircle} ${styles.bgDark}` }>
            <Ticket size={24} color="white" />
          </div>
          <div className={styles.metricValue}>{formatNumber(613780)}</div>
          <div className={styles.metricLabel}>Tickets Booked</div>
        </div>
        
        <div className={styles.metricItem}>
          <div className={`${styles.iconCircle} ${styles.bgDark}` }>
            <Ticket size={24} color="white" />
          </div>
          <div className={styles.metricValue}>{formatNumber(139404)}</div>
          <div className={styles.metricLabel}>Tickets Cancelled</div>
        </div>

        <div className={styles.metricItem}>
          <div className={`${styles.iconCircle} ${styles.bgGreen}` }>
            <Users size={24} color="white" />
          </div>
          <div className={styles.metricValue}>{formatNumber(1094303)}</div>
          <div className={styles.metricLabel}>Passengers Booked</div>
        </div>

        <div className={styles.metricItem}>
          <div className={`${styles.iconCircle} ${styles.bgGreen}` }>
            <Users size={24} color="white" />
          </div>
          <div className={styles.metricValue}>{formatNumber(224314)}</div>
          <div className={styles.metricLabel}>Passengers Cancelled</div>
        </div>

        <div className={styles.metricItem}>
          <div className={`${styles.iconCircle} ${styles.bgBlue}` }>
            <IndianRupee size={24} color="white" />
          </div>
          <div className={styles.metricValue}>₹ {formatNumber(7026366473)}</div>
          <div className={styles.metricLabel}>Gross Earning</div>
        </div>

        <div className={styles.metricItem}>
          <div className={`${styles.iconCircle} ${styles.bgBlue}` }>
            <IndianRupee size={24} color="white" />
          </div>
          <div className={styles.metricValue}>₹ {formatNumber(3745369124)}</div>
          <div className={styles.metricLabel}>Net Earning</div>
        </div>
      </div>
    </div>
  );
};

export default ZoneMapWidget;
