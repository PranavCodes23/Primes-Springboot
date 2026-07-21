import React from 'react';
import AdvanceReservationChart from './AdvanceReservationChart';
import ZoneMapPlaceholder from './ZoneMapPlaceholder';
import BookingStatistics from './BookingStatistics';
import DistributionRow from './DistributionRow';
import styles from './DashboardGrid.module.css';

interface DashboardGridProps {
  data: any;
}

const DashboardGrid: React.FC<DashboardGridProps> = ({ data }) => {
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.topGrid}>
        <div className={styles.leftCol}>
          <AdvanceReservationChart />
        </div>
        <div className={styles.centerCol}>
          <ZoneMapPlaceholder data={data} />
        </div>
        <div className={styles.rightCol}>
          <BookingStatistics data={data} />
        </div>
      </div>
      
      <DistributionRow />
    </div>
  );
};

export default DashboardGrid;
