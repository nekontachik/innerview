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

  if (error) throw error;
  return data;
}

export async function getPortrait(id: string) {
  const { data, error } = await supabase
    .from('portraits')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function incrementReaction(portraitId: string, reactionType: 'isMe' | 'isBeautiful' | 'isTouching') {
  const { data, error } = await supabase
    .rpc('increment_reaction', {
      portrait_id: portraitId,
      reaction_type: reactionType
    });

  if (error) throw error;
  return data;
} 