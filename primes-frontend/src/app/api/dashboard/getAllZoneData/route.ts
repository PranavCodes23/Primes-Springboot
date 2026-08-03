import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { date } = await req.json();

    if (!date) {
      return NextResponse.json({ error: 'Date is required' }, { status: 400 });
    }

    // Parse the date (format is typically YYYY-MM-DD)
    const queryDate = new Date(date);

    // Query Prisma
    const data = await prisma.zoneData.findMany({
      where: {
        date: queryDate
      }
    });

    if (data.length === 0) {
      return NextResponse.json({ currData: [] }, { status: 200 });
    }

    // Format matches existing frontend expectations exactly
    // since the database schema was designed to match it!
    return NextResponse.json({ currData: data }, { status: 200 });

  } catch (error) {
    console.error('Error fetching zone data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
