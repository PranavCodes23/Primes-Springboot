import FilterBar from '@/components/layout/FilterBar';
import ZoneMapScreen from '@/components/ZoneMap/ZoneMapScreen';
import BookingStatistics from '@/components/dashboard/BookingStatistics';

import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

async function getDashboardData() {
  try {
    const res = await fetch('http://localhost:8080/api/v1/dashboard/zone-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date: '2025-01-01' }),
      cache: 'no-store'
    });
    const mapData = await res.json();
    
    const statsRes = await fetch('http://localhost:8080/api/v1/dashboard/stats-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
      cache: 'no-store'
    });
    const statsData = await statsRes.json();
    
    return { currData: mapData.currData || [], statsData: statsData.statsData || [] };
  } catch (e) {
    console.error("Error fetching from FastAPI backend", e);
    return { currData: [], statsData: [] };
  }
}

export default async function UtsDashboard() {
  const { currData, statsData } = await getDashboardData();
  
  return (
    <>
      <FilterBar />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', padding: '15px', minHeight: 'calc(100vh - 60px)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white', borderRadius: '0', border: '1px solid #ddd', boxShadow: 'none' }}>
          <ZoneMapScreen data={{ currData }} isUtsDashboard={true} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white', borderRadius: '0', border: '1px solid #ddd', boxShadow: 'none', width: '100%' }}>
          <BookingStatistics data={statsData} isUtsDashboard={true} />
        </div>
      </div>
    </>
  );
}
