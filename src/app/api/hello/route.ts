import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request: Request) {
  console.log('Hello API called');
  return NextResponse.json({ 
    message: 'Hello World',
    timestamp: new Date().toISOString()
  });
} 