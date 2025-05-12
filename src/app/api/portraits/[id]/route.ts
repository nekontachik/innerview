import { NextResponse } from 'next/server';
import { getPortrait } from '@/lib/supabase';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const portrait = await getPortrait(params.id);
    return NextResponse.json(portrait);
  } catch (error) {
    console.error('Error fetching portrait:', error);
    return NextResponse.json(
      { error: 'Failed to fetch portrait' },
      { status: 500 }
    );
  }
} 