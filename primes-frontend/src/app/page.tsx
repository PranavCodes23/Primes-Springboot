import FilterBar from '@/components/layout/FilterBar';
import DashboardGrid from '@/components/dashboard/DashboardGrid';

// Force Next.js to dynamically render this page on every single request
export const dynamic = 'force-dynamic';

// Simulate ISR data fetching from our BFF proxy
async function getDashboardData() {
  // In a real scenario with the BFF, this would be:
  // const res = await fetch('http://localhost:3000/api/dashboard/getAllZoneData', { 
  //   next: { revalidate: 60 } 
  // });
  // return res.json();
  
  // Simulating network delay and returning the mock data directly for the prototype
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return {
    currData: [
      { 
        booking_loc: "ALL", 
        tktbkd: 1968310, 
        psgnbkg: 3102119, 
        earning: 2500463788, 
        refund: 479282633, 
        net: 2021181155, 
        tktcan: 419698, 
        psgncanc: 658324,
        loadingtime: "2026-07-15 13:08" 
      }
    ]
  };
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
