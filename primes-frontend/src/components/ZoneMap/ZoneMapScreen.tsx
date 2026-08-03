'use client';

import React, { useState, useEffect } from 'react';
import styles from './ZoneMapScreen.module.css';
import { ZoneMap } from './ZoneMap';
import { Ticket, Users, IndianRupee, Clock, Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ZoneMapScreenProps {
  data: any;
  isUtsDashboard?: boolean;
  isEnlarged?: boolean;
}

const formatNumber = (num: number) => {
  return new Intl.NumberFormat('en-IN').format(num || 0);
};

export default function ZoneMapScreen({ data, isUtsDashboard = false, isEnlarged = false }: ZoneMapScreenProps) {
  const router = useRouter();
  const [selectedMetric, setSelectedMetric] = useState<'tktbkd' | 'tktcan' | 'psgnbkg' | 'psgncanc' | 'earning' | 'refund' | 'net'>('earning');
  const [clickedMetric, setClickedMetric] = useState<'tktbkd' | 'tktcan' | 'psgnbkg' | 'psgncanc' | 'earning' | 'refund' | 'net'>('earning');
  const [hoveredZoneId, setHoveredZoneId] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [selectedDate, setSelectedDate] = useState('2025-01-01');
  const dateInputRef = React.useRef<HTMLInputElement>(null);
  const [localData, setLocalData] = useState(data);
  const initialDataRef = React.useRef(data);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [isTableOpen, setIsTableOpen] = useState(false);
  const [sortColumn, setSortColumn] = useState<'zone' | 'prev' | 'curr'>('zone');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // If the date is the initial date, use the initial data prop to avoid double-fetching
    if (selectedDate === '2025-01-01') {
      setLocalData(initialDataRef.current);
      return;
    }
    
    const fetchDateData = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/v1/dashboard/zone-data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ date: selectedDate }),
          cache: 'no-store'
        });
        const result = await res.json();
        
        if (res.ok && result?.currData && result.currData.length > 0) {
          setLocalData(result);
          setToastMessage(null);
        } else {
          setLocalData(generateEmptyData(selectedDate));
          setToastMessage(`No data available for ${selectedDate}`);
          setTimeout(() => setToastMessage(null), 3000);
        }
      } catch (e) {
        setLocalData(generateEmptyData(selectedDate));
        setToastMessage(`Error fetching data for ${selectedDate}`);
        setTimeout(() => setToastMessage(null), 3000);
      }
    };

    fetchDateData();
  }, [selectedDate]);

  const generateEmptyData = (date: string) => {
    const zones = ['ALL', 'NR', 'NW', 'NF', 'NE', 'NC', 'WC', 'EC', 'ER', 'WR', 'SB', 'SE', 'CR', 'EO', 'SC', 'KR', 'SW', 'SR'];
    return {
      currData: zones.map(z => ({
        booking_loc: z,
        tktbkd: 0,
        tktcan: 0,
        psgnbkg: 0,
        psgncanc: 0,
        earning: 0,
        refund: 0,
        net: 0,
        loadingtime: `2026-07-15 13:08` // Default fallback time
      }))
    };
  };

  const handleCalendarClick = () => {
    try {
      dateInputRef.current?.showPicker();
    } catch (e) {
      // Fallback for browsers that don't support showPicker
      dateInputRef.current?.focus();
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const metricIds: Array<'tktbkd' | 'tktcan' | 'psgnbkg' | 'psgncanc' | 'earning' | 'refund' | 'net'> = [
    'tktbkd', 'tktcan', 'psgnbkg', 'psgncanc', 'earning', 'refund', 'net'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedMetric(prev => {
        const currIndex = metricIds.indexOf(prev);
        const nextIndex = (currIndex + 1) % metricIds.length;
        return metricIds[nextIndex];
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const displayData = localData?.currData?.find((d: any) => d.booking_loc === 'ALL') || {};

  const zoneNames: Record<string, string> = {
    'NR': 'Northern Railway',
    'NW': 'North Western Railway',
    'NF': 'Northeast Frontier Railway',
    'NE': 'North Eastern Railway',
    'NC': 'North Central Railway',
    'WC': 'West Central Railway',
    'EC': 'East Central Railway',
    'ER': 'Eastern Railway',
    'WR': 'Western Railway',
    'SB': 'South East Central Railway',
    'SE': 'South Eastern Railway',
    'CR': 'Central Railway',
    'EO': 'East Coast Railway',
    'SC': 'South Central Railway',
    'KR': 'Konkan Railway',
    'SW': 'South Western Railway',
    'SR': 'Southern Railway'
  };

  const getHoveredZoneData = () => {
    if (!hoveredZoneId) return null;
    let zData = localData?.currData?.find((d: any) => d.booking_loc === hoveredZoneId);
    if (!zData) zData = { tktbkd: 0, tktcan: 0, psgnbkg: 0, psgncanc: 0, earning: 0, refund: 0, net: 0 };
    return zData;
  };

  const hData = getHoveredZoneData();

  let metrics = [
    { id: 'tktbkd' as const, label: 'Tickets Booked', value: displayData.tktbkd, iconType: 'ticket', colorClass: styles.textDark },
    { id: 'tktcan' as const, label: 'Tickets Cancelled', value: displayData.tktcan, iconType: 'ticket', colorClass: styles.textDark },
    { id: 'psgnbkg' as const, label: 'Passengers Booked', value: displayData.psgnbkg, iconType: 'passengers', colorClass: styles.textDark },
    { id: 'psgncanc' as const, label: 'Passengers Cancelled', value: displayData.psgncanc, iconType: 'passengers', colorClass: styles.textDark },
    { id: 'earning' as const, label: 'Gross Earning', value: `₹ ${formatNumber(displayData.earning)}`, iconType: 'gross', colorClass: styles.textDark, rawValue: displayData.earning },
    { id: 'refund' as const, label: 'Refund', value: `₹ ${formatNumber(displayData.refund)}`, iconType: 'refund', colorClass: styles.textDark, rawValue: displayData.refund },
    { id: 'net' as const, label: 'Net Earning', value: `₹ ${formatNumber(displayData.net)}`, iconType: 'net', colorClass: styles.textDark, rawValue: displayData.net }
  ];

  if (isUtsDashboard) {
    metrics = metrics.filter(m => ['tktbkd', 'psgnbkg', 'earning', 'tktcan', 'psgncanc', 'refund'].includes(m.id));
  }

  const renderIcon = (type: string) => {
    switch(type) {
      case 'ticket':
        return (
          <div className={styles.iconCircleDark}>
            <Ticket color="white" fill="#f25c05" size={20} className={styles.ticketIcon} />
          </div>
        );
      case 'passengers':
        return (
          <div className={styles.iconCircleGreen}>
            <Users color="white" fill="white" size={24} />
          </div>
        );
      case 'gross':
        return (
          <div className={styles.grossIconContainer}>
             <div className={styles.grossHand}>
               <div className={styles.grossCircle}>
                 <IndianRupee color="white" size={14} strokeWidth={3} />
               </div>
             </div>
          </div>
        );
      case 'refund':
        return (
          <div className={styles.refundIconContainer}>
             <div className={styles.refundCircle}>
               <IndianRupee color="white" size={14} strokeWidth={3} />
             </div>
          </div>
        );
      case 'net':
        return (
          <div className={styles.iconCircleDark}>
            <IndianRupee color="#ffb300" size={32} strokeWidth={2.5} />
          </div>
        );
      default:
        return <div className={styles.metricIconPlaceholder}></div>;
    }
  };

  const renderMetrics = (isMiniature: boolean) => (
    <div className={isMiniature ? styles.metricsContainerUtsGrid : (isUtsDashboard ? styles.metricsContainerUts : styles.metricsContainer)}>
      {metrics.map((m) => (
        <div 
          key={m.id} 
          className={`${isUtsDashboard ? styles.metricCardUts : styles.metricCard} ${selectedMetric === m.id && !isUtsDashboard ? styles.selectedCard : ''}`}
          style={{ padding: '5px', cursor: (isEnlarged && isUtsDashboard) ? 'pointer' : 'default' }}
          onClick={() => {
            if (isEnlarged && isUtsDashboard) {
              setClickedMetric(m.id as any);
              setIsTableOpen(true);
              setCurrentPage(1); // Reset page on metric change
            }
          }}
        >
          <div className={styles.iconWrapper}>
            {renderIcon(m.iconType)}
          </div>
          <div className={`${styles.metricValue} ${m.colorClass}`}>
            {m.rawValue !== undefined ? m.value : formatNumber(m.value as number)}
          </div>
          <div className={styles.metricLabel}>{m.label}</div>
        </div>
      ))}
    </div>
  );

  return (
    <div className={styles.screenContainer} onMouseMove={handleMouseMove} style={isUtsDashboard ? { border: 'none', boxShadow: 'none' } : {}}>
      {isUtsDashboard ? (
        <div className={styles.headerPanelUts}>
          <div style={{ background: '#a0e4e6', color: '#10394a', fontWeight: 'bold', padding: '8px', textAlign: 'center', fontSize: '15px', borderRadius: '0' }}>
            ZONE MAP(UTS)
          </div>
          <div style={{ background: '#dcf4f5', color: '#10394a', fontWeight: 'bold', padding: '6px', textAlign: 'center', fontSize: '13px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
            ON DATE : {selectedDate}
            <div 
              onClick={handleCalendarClick}
              style={{ cursor: 'pointer', position: 'relative', display: 'flex' }}
              title="Select Date"
            >
              <Calendar size={18} color="blue" fill="white" strokeWidth={2} />
              <input 
                type="date" 
                ref={dateInputRef}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                style={{ 
                  position: 'absolute', 
                  opacity: 0, 
                  width: '100%', 
                  height: '100%', 
                  cursor: 'pointer',
                  left: 0,
                  top: 0
                }} 
              />
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.headerPanel}>
          <div className={styles.lastUpdated}>
            <Clock size={16} /> 
            Last Updated: {displayData.loadingtime ? displayData.loadingtime.split('.')[0].replace('T', ' ') : '2026-07-15 13:08:00'}
          </div>
          <div className={styles.headerTitle} style={{ gap: '10px' }}>
            ALL INDIA EARNINGS ON DATE : {selectedDate}
            <div 
              onClick={handleCalendarClick}
              style={{ cursor: 'pointer', position: 'relative', display: 'flex' }}
              title="Select Date"
            >
              <Calendar size={18} color="blue" fill="white" strokeWidth={2} />
              <input 
                type="date" 
                ref={dateInputRef}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                style={{ 
                  position: 'absolute', 
                  opacity: 0, 
                  width: '100%', 
                  height: '100%', 
                  cursor: 'pointer',
                  left: 0,
                  top: 0
                }} 
              />
            </div>
          </div>
          <div style={{ width: '150px' }}></div>
        </div>
      )}

      {/* Render metrics ABOVE the map if it is NOT the UTS miniature view */}
      {!(isUtsDashboard && !isEnlarged) && renderMetrics(false)}

      {(() => {
        const activeTableMetric = clickedMetric;
        const metricInfo = metrics.find(m => m.id === activeTableMetric);
        const metricName = metricInfo ? metricInfo.label : '';
        
        const tableData = [...(localData?.currData || [])].filter((d: any) => d.booking_loc !== 'ALL' && d.booking_loc?.toUpperCase() !== 'INTERNET');
        tableData.sort((a, b) => {
          let aVal, bVal;
          if (sortColumn === 'zone') {
            aVal = a.booking_loc;
            bVal = b.booking_loc;
          } else if (sortColumn === 'curr') {
            aVal = a[activeTableMetric] || 0;
            bVal = b[activeTableMetric] || 0;
          } else {
            aVal = 0; 
            bVal = 0;
          }
          
          if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
          if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
          return 0;
        });

        const itemsPerPage = 10;
        const totalPages = Math.ceil(tableData.length / itemsPerPage);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const currentData = tableData.slice(startIndex, startIndex + itemsPerPage);

        const handleSort = (col: 'zone' | 'prev' | 'curr') => {
          if (sortColumn === col) {
            setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
          } else {
            setSortColumn(col);
            setSortDir('asc');
          }
        };

        return (
          <div className={isTableOpen ? styles.layoutFlex : ''} style={{ flex: 1 }}>
            <div className={isTableOpen ? styles.mapHalf : styles.mapContainerWrapper} style={isTableOpen ? { backgroundImage: "url('/white-bg.png')" } : {}}>
              <div 
                className={isUtsDashboard && !isEnlarged ? styles.mapAreaUts : styles.mapArea} 
                onClick={() => {
                  if (!isEnlarged && isUtsDashboard) {
                    router.push('/uts-dashboard/map');
                  }
                }}
                style={{ cursor: (!isEnlarged && isUtsDashboard) ? 'pointer' : 'default' }}
              >
                <ZoneMap 
                  onZoneHover={(id) => setHoveredZoneId(id)}
                  onZoneLeave={() => setHoveredZoneId(null)}
                  data={localData}
                  selectedMetric={selectedMetric}
                  isUtsDashboard={isUtsDashboard}
                  isEnlarged={isEnlarged}
                />
              </div>
            </div>
            
            {isTableOpen && (
              <div className={styles.tableHalf}>
                <div className={styles.dataTableContainer}>
                  <div className={styles.dataTableHeader}>
                    <span>ZONE WISE {metricName.toUpperCase()}</span>
                    <button className={styles.closeButton} onClick={() => setIsTableOpen(false)}>×</button>
                  </div>
                  <table className={styles.dataTable}>
                    <thead>
                      <tr>
                        <th onClick={() => handleSort('zone')}>Zone {sortColumn === 'zone' && (sortDir === 'asc' ? '↑' : '↓')}</th>
                        <th onClick={() => handleSort('prev')}>Previous Year {sortColumn === 'prev' && (sortDir === 'asc' ? '↑' : '↓')}</th>
                        <th onClick={() => handleSort('curr')}>Current Year {sortColumn === 'curr' && (sortDir === 'asc' ? '↑' : '↓')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentData.map((row: any) => (
                        <tr key={row.booking_loc}>
                          <td>{row.booking_loc}</td>
                          <td>N/A</td>
                          <td>{formatNumber(row[activeTableMetric] || 0)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className={styles.paginationContainer}>
                    <div>Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, tableData.length)} of {tableData.length} entries</div>
                    <div className={styles.paginationControls}>
                      <button 
                        className={styles.pageButton} 
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      >
                        &lt;
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button 
                          key={page}
                          className={`${styles.pageButton} ${currentPage === page ? styles.pageButtonActive : ''}`}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </button>
                      ))}
                      <button 
                        className={styles.pageButton} 
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      >
                        &gt;
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })()}
      
      {/* Render metrics BELOW the map if it IS the UTS miniature view */}
      {(isUtsDashboard && !isEnlarged) && renderMetrics(true)}
      
      {hoveredZoneId && hData && (
        <div 
          className={styles.tooltip} 
          style={{ left: mousePos.x + 15, top: mousePos.y + 15 }}
        >
          <div className={styles.tooltipHeader}>{zoneNames[hoveredZoneId] || hoveredZoneId}</div>
          <div className={styles.tooltipRow}>Tickets Booked: {formatNumber(hData.tktbkd)}</div>
          <div className={styles.tooltipRow}>Tickets Cancelled: {formatNumber(hData.tktcan)}</div>
          <div className={styles.tooltipRow}>Passengers Booked: {formatNumber(hData.psgnbkg)}</div>
          <div className={styles.tooltipRow}>Passengers Cancelled: {formatNumber(hData.psgncanc)}</div>
          <div className={styles.tooltipRow}>Gross Earning: {formatNumber(hData.earning)}</div>
          <div className={styles.tooltipRow}>Refund: {formatNumber(hData.refund)}</div>
          <div className={styles.tooltipRow}>Net Earning: {formatNumber(hData.net)}</div>
        </div>
      )}
      
      {toastMessage && (
        <div className={styles.toast}>
          {toastMessage}
        </div>
      )}
    </div>
  );
}
