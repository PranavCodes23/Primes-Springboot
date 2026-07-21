import React from 'react';
import FilterBar from '@/components/layout/FilterBar';
import styles from '@/components/dashboard/DashboardGrid.module.css';

export default function Loading() {
  // This loading skeleton is streamed instantly to the browser while the fresh data is fetched!
  return (
    <>
      <FilterBar />
      <div className={styles.dashboardContainer} style={{ opacity: 0.5, pointerEvents: 'none' }}>
        <div style={{ textAlign: 'center', padding: '50px', fontSize: '1.2rem', color: 'var(--color-primary)' }}>
          <div className="spinner" style={{ marginBottom: '15px' }}>⏳</div>
          Fetching live data from servers...
        </div>
        
        {/* Placeholder structural blocks for the skeleton */}
        <div className={styles.topGrid}>
          <div className={`panel ${styles.leftCol}`} style={{ minHeight: '400px' }}></div>
          <div className={`panel ${styles.centerCol}`} style={{ minHeight: '400px' }}></div>
          <div className={`panel ${styles.rightCol}`} style={{ minHeight: '400px' }}></div>
        </div>
      </div>
    </>
  );
}
