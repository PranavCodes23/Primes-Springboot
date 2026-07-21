import React from 'react';
import styles from './ZoneMapPlaceholder.module.css';
import { Ticket, Users, FileX, UserX, IndianRupee, MapPin } from 'lucide-react';

interface ZoneMapProps {
  data: any;
}

const ZoneMapPlaceholder: React.FC<ZoneMapProps> = ({ data }) => {
  const allData = data?.currData?.find((d: any) => d.booking_loc === 'ALL') || {};

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-IN').format(num || 0);
  };

  return (
    <div className={`panel ${styles.container}`}>
      <div className="panel-header">ZONE MAP</div>
      
      <div className={styles.mapArea}>
        <div className={styles.placeholderMap}>
          <MapPin size={48} color="#cccccc" />
          <p>Interactive Map Placeholder</p>
          <small>(Awaiting SVG)</small>
        </div>
      </div>

      <div className={styles.metricsGrid}>
        <div className={styles.metricItem}>
          <div className={`${styles.iconCircle} ${styles.bgDark}` }>
            <Ticket size={24} color="white" />
          </div>
          <div className={styles.metricValue}>{formatNumber(allData.tktbkd)}</div>
          <div className={styles.metricLabel}>Tickets Booked</div>
        </div>
        
        <div className={styles.metricItem}>
          <div className={`${styles.iconCircle} ${styles.bgDark}` }>
            <FileX size={24} color="white" />
          </div>
          <div className={styles.metricValue}>{formatNumber(allData.tktcan)}</div>
          <div className={styles.metricLabel}>Tickets Cancelled</div>
        </div>

        <div className={styles.metricItem}>
          <div className={`${styles.iconCircle} ${styles.bgGreen}` }>
            <Users size={24} color="white" />
          </div>
          <div className={styles.metricValue}>{formatNumber(allData.psgnbkg)}</div>
          <div className={styles.metricLabel}>Passengers Booked</div>
        </div>

        <div className={styles.metricItem}>
          <div className={`${styles.iconCircle} ${styles.bgGreen}` }>
            <UserX size={24} color="white" />
          </div>
          <div className={styles.metricValue}>{formatNumber(allData.psgncanc)}</div>
          <div className={styles.metricLabel}>Passengers Cancelled</div>
        </div>

        <div className={styles.metricItem}>
          <div className={`${styles.iconCircle} ${styles.bgBlue}` }>
            <IndianRupee size={24} color="white" />
          </div>
          <div className={styles.metricValue}>₹ {formatNumber(allData.earning)}</div>
          <div className={styles.metricLabel}>Gross Earning</div>
        </div>

        <div className={styles.metricItem}>
          <div className={`${styles.iconCircle} ${styles.bgBlue}` }>
            <IndianRupee size={24} color="white" />
          </div>
          <div className={styles.metricValue}>₹ {formatNumber(allData.net)}</div>
          <div className={styles.metricLabel}>Net Earning</div>
        </div>
      </div>
    </div>
  );
};

export default ZoneMapPlaceholder;
