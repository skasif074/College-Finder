import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// Next.js 15 requires 'params' to be treated as a Promise
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> } 
) {
  try {
    // 🚀 THE FIX: We MUST await params in Next.js 15
    const { id } = await params;

    console.log("Backend received request for ID:", id);

    const college = await prisma.college.findUnique({
      where: { id: id },
    });

    if (!college) {
      console.log("Database: ID not found");
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }

    return NextResponse.json(college);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}