import React from 'react';
import styles from './SummaryCards.module.css';

interface SummaryCardsProps {
  data: any;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ data }) => {
  const allData = data?.currData?.find((d: any) => d.booking_loc === 'ALL') || {};

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-IN').format(num || 0);
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.card} ${styles.blueCard}`}>
        <div className={styles.value}>{formatNumber(allData.psgnbkg)}</div>
        <div className={styles.label}>Net Passengers booked (Thousand)</div>
      </div>
      <div className={`${styles.card} ${styles.redCard}`}>
        <div className={styles.value}>{formatNumber(allData.tktbkd)}</div>
        <div className={styles.label}>Net Tickets booked (Thousands)</div>
      </div>
      <div className={`${styles.card} ${styles.purpleCard}`}>
        <div className={styles.value}>₹ {formatNumber(allData.earning)}</div>
        <div className={styles.label}>☑ Total Earnings (Lakhs)</div>
      </div>
    </div>
  );
};

export default SummaryCards;
