import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';

    const colleges = await prisma.college.findMany({
      where: {
        name: {
          contains: search,
          mode: 'insensitive', 
        }
      },
      orderBy: {
        rating: 'desc'
      }
    });

    return NextResponse.json(colleges);
  } catch (error) {
    console.error("Error fetching colleges:", error);
    return NextResponse.json({ error: "Failed to fetch colleges" }, { status: 500 });
  }
}