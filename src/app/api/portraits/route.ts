import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createPortrait } from '@/lib/supabase';
import { createPortraitSchema, validateRequestBody } from '@/lib/middleware/validateRequest';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// GET /api/portraits - отримати всі портрети
export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase credentials');
    }

    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false }
    });

    const { data, error } = await supabase
      .from('portraits')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching portraits:', error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error in GET /api/portraits:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/portraits - створити новий портрет
export async function POST(request: Request) {
  try {
    const { data, error } = await validateRequestBody(request, createPortraitSchema);
    
    if (error) {
      return NextResponse.json(
        { success: false, error: error.message, details: error.details },
        { status: 400 }
      );
    }

    const portrait = await createPortrait(data.text, data.image_url);
    if (!portrait) {
      return NextResponse.json(
        { success: false, error: 'Failed to create portrait' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: portrait });
  } catch (error) {
    console.error('Error in POST /api/portraits:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
} 