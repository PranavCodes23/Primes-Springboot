"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  LayoutDashboard, 
  Map, 
  ChevronLeft, 
  FileText, 
  PieChart, 
  Database, 
  Activity, 
  Shield, 
  TrendingUp, 
  Menu,
  List
} from 'lucide-react';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});
  const pathname = usePathname();

  const toggleSubmenu = (title: string, e: React.MouseEvent) => {
    e.preventDefault();
    setOpenSubmenus(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const menuItems = [
    { icon: <Home size={18} />, title: "Home", href: "/", isHome: true },
    { icon: <LayoutDashboard size={18} />, title: "UTS Dashboard", href: "/uts-dashboard" },
    { icon: <Map size={18} />, title: "Zone Map", href: "/zonemap" },
    { 
      icon: <FileText size={18} />, 
      title: "Existing Reports", 
      submenu: [
        { title: "Accounts Report", href: "#" },
        { title: "Earning Statement", href: "#" },
      ]
    },
    { 
      icon: <PieChart size={18} />, 
      title: "Analytics Reports", 
      submenu: [
        { title: "Special Report", href: "#" },
        { title: "Report Builder", href: "#" },
      ]
    },
    { icon: <Shield size={18} />, title: "Vigilance Reports", href: "#" },
    { icon: <Activity size={18} />, title: "Digital Txns Report", href: "#" },
    { 
      icon: <TrendingUp size={18} />, 
      title: "PRABAL REPORTS", 
      submenu: [
        { title: "Sub Report 1", href: "#" }
      ]
    },
    { 
      icon: <Database size={18} />, 
      title: "DW Reports", 
      submenu: [
        { title: "Sub Report 1", href: "#" }
      ]
    },
    { icon: <Activity size={18} />, title: "Monitoring Report", href: "#" },
    { 
      icon: <List size={18} />, 
      title: "RITES REPORTS", 
      submenu: [
        { title: "Sub Report 1", href: "#" }
      ]
    },
    { icon: <FileText size={18} />, title: "YSA REPORTS", href: "#" },
    { icon: <FileText size={18} />, title: "RLDA Reports", href: "#" },
    { icon: <FileText size={18} />, title: "IRCTC Reports", href: "#" },
    { icon: <FileText size={18} />, title: "IB Reports", href: "#" },
    { icon: <FileText size={18} />, title: "FACAO Reports", href: "#" },
  ];

  return (
    <aside 
      className={`${styles.sidebar} ${isHovered ? styles.expanded : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setOpenSubmenus({}); // Close submenus when sidebar collapses
      }}
    >
      <div className={styles.hamburger}>
        <Menu size={24} color="white" />
      </div>

      <nav className={styles.nav}>
        {menuItems.map((item, index) => {
          // Check if active based on pathname
          const isActive = item.href && item.href !== '#' && (item.href === '/' ? pathname === '/' : pathname?.startsWith(item.href));

          return (
            <div key={index} className={styles.navItemContainer}>
              {item.submenu ? (
                <div 
                  className={`${styles.navItem} ${isActive ? styles.active : ''} ${item.isHome ? styles.isHome : ''}`}
                  onClick={(e) => isHovered && toggleSubmenu(item.title, e)}
                  title={!isHovered ? item.title : ''}
                >
                  <div className={styles.iconWrapper}>{item.icon}</div>
                  {isHovered && (
                    <>
                      <span className={styles.navTitle}>{item.title}</span>
                      <ChevronLeft 
                        size={16} 
                        className={`${styles.caret} ${openSubmenus[item.title] ? styles.caretOpen : ''}`} 
                      />
                    </>
                  )}
                </div>
              ) : (
                <Link 
                  href={item.href || '#'} 
                  className={`${styles.navItem} ${isActive ? styles.active : ''} ${item.isHome && isHovered ? styles.activeHome : ''}`}
                  title={!isHovered ? item.title : ''}
                >
                  <div className={styles.iconWrapper}>{item.icon}</div>
                  {isHovered && <span className={styles.navTitle}>{item.title}</span>}
                </Link>
              )}
              
              {/* Submenu rendering */}
              {isHovered && item.submenu && openSubmenus[item.title] && (
                <div className={styles.submenu}>
                  {item.submenu.map((sub, subIdx) => (
                    <Link key={subIdx} href={sub.href} className={styles.submenuItem}>
                      {sub.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
