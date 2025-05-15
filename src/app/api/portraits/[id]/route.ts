import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { updateReactionSchema, validateRequestBody } from '@/lib/middleware/validateRequest';
import { ApiResponse, Portrait } from '@/types';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// GET /api/portraits/[id] - отримати портрет за ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
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
      .eq('id', params.id)
      .single();

    if (error) {
      console.error('Error fetching portrait:', error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { success: false, error: 'Portrait not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error in GET /api/portraits/[id]:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PATCH /api/portraits/[id] - оновити реакції
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { data, error } = await validateRequestBody(request, updateReactionSchema);
    
    if (error) {
      return NextResponse.json(
        { success: false, error: error.message, details: error.details },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase credentials');
    }

    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false }
    });

    // Отримуємо поточний портрет
    const { data: portrait, error: fetchError } = await supabase
      .from('portraits')
      .select('*')
      .eq('id', params.id)
      .single();

    if (fetchError) {
      console.error('Error fetching portrait:', fetchError);
      return NextResponse.json(
        { success: false, error: fetchError.message },
        { status: 500 }
      );
    }

    if (!portrait) {
      return NextResponse.json(
        { success: false, error: 'Portrait not found' },
        { status: 404 }
      );
    }

    // Оновлюємо реакції
    const reactions = portrait.reactions || { isMe: 0, isBeautiful: 0, isTouching: 0 };
    reactions[data.reactionType] = (reactions[data.reactionType] || 0) + 1;

    // Зберігаємо оновлений портрет
    const { data: updatedPortrait, error: updateError } = await supabase
      .from('portraits')
      .update({ reactions })
      .eq('id', params.id)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating portrait:', updateError);
      return NextResponse.json(
        { success: false, error: updateError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: updatedPortrait });
  } catch (error) {
    console.error('Error in PATCH /api/portraits/[id]:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/portraits/[id] - видалити портрет
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase credentials');
    }

    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false }
    });

    const { error } = await supabase
      .from('portraits')
      .delete()
      .eq('id', params.id);

    if (error) {
      console.error('Error deleting portrait:', error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: 'Portrait deleted successfully' });
  } catch (error) {
    console.error('Error in DELETE /api/portraits/[id]:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
} 