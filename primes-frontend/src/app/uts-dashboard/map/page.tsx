import FilterBar from '@/components/layout/FilterBar';
import ZoneMapScreen from '@/components/ZoneMap/ZoneMapScreen';
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
    return { currData: mapData.currData || [] };
  } catch (e) {
    console.error("Error fetching from FastAPI backend", e);
    return { currData: [] };
  }
}

export default async function UtsDashboardMapPage() {
  const data = await getDashboardData();
  
  return (
    <>
      <FilterBar />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', padding: '15px', minHeight: 'calc(100vh - 60px)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white', borderRadius: '0', border: '1px solid #ddd', boxShadow: 'none' }}>
          <ZoneMapScreen data={data} isUtsDashboard={true} isEnlarged={true} />
        </div>
      </div>
    </>
  );
}
