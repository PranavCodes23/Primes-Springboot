import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return NextResponse.json({
    currData: [
      { booking_loc: "NR", tktbkd: 120500, psgnbkg: 210000, earning: 1500000, refund: 20000, net: 1480000, tktcan: 5000, psgncanc: 8000 },
      { booking_loc: "WR", tktbkd: 95000, psgnbkg: 180000, earning: 1200000, refund: 15000, net: 1185000, tktcan: 3000, psgncanc: 5000 },
      // ... (other zones would go here, we'll just mock the ALL INDIA object at the end as expected by the JS)
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
    ],
    previousYData: [
      { booking_loc: "NR", tktbkd: 110000, psgnbkg: 200000, earning: 1400000, refund: 18000, net: 1382000, tktcan: 4500, psgncanc: 7500 },
      { booking_loc: "WR", tktbkd: 90000, psgnbkg: 170000, earning: 1100000, refund: 14000, net: 1086000, tktcan: 2800, psgncanc: 4500 },
      { 
        booking_loc: "ALL", 
        tktbkd: 590000, 
        psgnbkg: 1050000, 
        earning: 8900000, 
        refund: 75000, 
        net: 710000, 
        tktcan: 120000, 
        psgncanc: 20000 
      }
    ]
  });
}
