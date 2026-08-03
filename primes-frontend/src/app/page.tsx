import FilterBar from '@/components/layout/FilterBar';
import DashboardGrid from '@/components/dashboard/DashboardGrid';

import { prisma } from '@/lib/prisma';

// Force Next.js to dynamically render this page on every single request
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

export default async function Home() {
  // Server Component - fetches data on the server with ISR caching
  const data = await getDashboardData();
  
  return (
    <>
      <FilterBar />
      <DashboardGrid data={data} />
    </>
  );
}
