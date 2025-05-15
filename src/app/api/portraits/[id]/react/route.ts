import { NextResponse } from 'next/server';
import { incrementReaction } from '@/lib/supabase';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { type } = await request.json();

    if (!type || !['isMe', 'isBeautiful', 'isTouching'].includes(type)) {
      return NextResponse.json(
        { error: 'Invalid reaction type' },
        { status: 400 }
      );
    }

    const reactions = await incrementReaction(params.id, type);

    return NextResponse.json({ reactions });
  } catch (error) {
    console.error('Error updating reaction:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update reaction' },
      { status: 500 }
    );
  }
} 