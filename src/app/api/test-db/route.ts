import { NextResponse } from 'next/server';
import { createPortrait } from '@/lib/supabase';

export async function GET() {
  try {
    // Try to create a test portrait
    const testPortrait = await createPortrait('Test portrait');
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      data: testPortrait
    });
  } catch (error) {
    console.error('Database connection test failed:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Database connection failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 