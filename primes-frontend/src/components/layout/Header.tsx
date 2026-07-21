import React from 'react';
import { Info, Bell, Settings, LogOut, User } from 'lucide-react';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <div className={styles.logoText}>
          PASSENGER RESERVATION INFORMATION MANAGEMENT ENHANCED SYSTEM
        </div>
      </div>
      <div className={styles.actions}>
        <button className={styles.iconButton} title="Info"><Info size={18} /></button>
        <button className={styles.iconButton} title="Notifications"><Bell size={18} /></button>
        <button className={styles.iconButton} title="Settings"><Settings size={18} /></button>
        <div className={styles.profile}>
          <User size={18} />
          <span>User001</span>
        </div>
        <button className={styles.iconButton} title="Logout"><LogOut size={18} /></button>
      </div>
    </header>
  );
};

export default Header;
