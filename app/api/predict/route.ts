import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';


export async function POST(request: Request) {
  try {
    
    const body = await request.json();
    const rank = parseInt(body.rank || '0');

    if (!rank || rank <= 0) {
      return NextResponse.json([]);
    }

    // Query the database safely
    const colleges = await prisma.college.findMany({
      where: {
        minRank: { lte: rank }, 
        maxRank: { gte: rank }  
      },
      orderBy: { rating: 'desc' },
      take: 12 
    });

    return NextResponse.json(colleges);
  } catch (error) {
    console.error("Prediction API Error:", error);
    return NextResponse.json({ error: "Failed to predict" }, { status: 500 });
  }
}