import { NextResponse } from 'next/server';
import { incrementReaction } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const { portraitId, reactionType } = await req.json();

    if (!portraitId || !reactionType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const reactions = await incrementReaction(portraitId, reactionType);
    return NextResponse.json(reactions);
  } catch (error) {
    console.error('Error updating reaction:', error);
    return NextResponse.json(
      { error: 'Failed to update reaction' },
      { status: 500 }
    );
  }
} 