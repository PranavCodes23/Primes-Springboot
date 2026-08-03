import React from 'react';
import ZoneMapScreen from '@/components/ZoneMap/ZoneMapScreen';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

async function getZoneMapData() {
  const data = await prisma.zoneData.findMany({
    where: {
      date: new Date('2025-01-01')
    }
  });
  
  if (!data || data.length === 0) {
    return { currData: [] };
  }
  
  // Serialize dates and decimals to primitive types for React Client Components
  const serializedData = JSON.parse(JSON.stringify(data));
  return { currData: serializedData };
}

export default async function ZoneMapPage() {
  const data = await getZoneMapData();
  
  return (
    <div style={{ backgroundColor: '#f0f2f5', minHeight: '100vh', padding: '15px' }}>
      <ZoneMapScreen data={data} />
    </div>
  );
}
