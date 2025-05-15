import { createClient } from '@supabase/supabase-js';
import { Portrait } from '@/types';

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Helper functions
export async function createPortrait(text: string, imageUrl?: string) {
  if (!text || typeof text !== 'string') {
    throw new Error('Text is required and must be a string');
  }

  if (imageUrl && typeof imageUrl !== 'string') {
    throw new Error('ImageUrl must be a string');
  }

  const { data, error } = await supabase
    .from('portraits')
    .insert([
      {
        text,
        imageUrl,
        reactions: {
          isMe: 0,
          isBeautiful: 0,
          isTouching: 0
        }
      }
    ])
    .select()
    .single();

  if (error) {
    console.error('Error creating portrait:', error);
    throw new Error(`Failed to create portrait: ${error.message}`);
  }

  if (!data) {
    throw new Error('No data returned after creating portrait');
  }

  return data;
}

export async function getPortrait(id: string) {
  if (!id || typeof id !== 'string') {
    throw new Error('Valid ID is required');
  }

  const { data, error } = await supabase
    .from('portraits')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching portrait:', error);
    throw new Error(`Failed to fetch portrait: ${error.message}`);
  }

  if (!data) {
    throw new Error(`Portrait with ID ${id} not found`);
  }

  return data;
}

export async function incrementReaction(portraitId: string, reactionType: 'isMe' | 'isBeautiful' | 'isTouching') {
  if (!portraitId || typeof portraitId !== 'string') {
    throw new Error('Valid portraitId is required');
  }

  if (!reactionType || !['isMe', 'isBeautiful', 'isTouching'].includes(reactionType)) {
    throw new Error('Valid reactionType is required (isMe, isBeautiful, or isTouching)');
  }

  const { data, error } = await supabase
    .rpc('increment_reaction', {
      portrait_id: portraitId,
      reaction_type: reactionType
    });

  if (error) {
    console.error('Error incrementing reaction:', error);
    throw new Error(`Failed to increment reaction: ${error.message}`);
  }

  if (!data) {
    throw new Error(`Failed to increment reaction for portrait ${portraitId}`);
  }

  return data;
} 