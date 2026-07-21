import React from 'react';
import styles from './FilterBar.module.css';
import { Filter } from 'lucide-react';

const FilterBar = () => {
  return (
    <div className={styles.filterBar}>
      <div className={styles.title}>
        ALL ZONE STATISTICS
      </div>
      <button className={styles.filterBtn}>
        <span>FILTER</span>
        <Filter size={14} />
      </button>
    </div>
  );
};

export default FilterBar;
