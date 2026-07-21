import React from 'react';
import { Home, BarChart2, PieChart, LayoutDashboard, FileText, Database, Server } from 'lucide-react';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  const menuItems = [
    { icon: <Home size={20} />, active: true, title: "Home" },
    { icon: <BarChart2 size={20} />, title: "Charts" },
    { icon: <PieChart size={20} />, title: "Analytics" },
    { icon: <LayoutDashboard size={20} />, title: "Dashboard" },
    { icon: <FileText size={20} />, title: "Reports" },
    { icon: <Database size={20} />, title: "Data" },
    { icon: <Server size={20} />, title: "System" },
  ];

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        {menuItems.map((item, index) => (
          <button 
            key={index} 
            className={`${styles.navItem} ${item.active ? styles.active : ''}`}
            title={item.title}
          >
            {item.icon}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
