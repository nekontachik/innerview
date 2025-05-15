import { createClient } from '@supabase/supabase-js';
import { Portrait } from '@/types';

// Перевіряємо змінні середовища
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('Environment check:', {
  hasPublicUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
  hasPublicKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  finalUrl: supabaseUrl,
  finalKey: supabaseKey ? 'exists' : 'missing'
});

if (!supabaseUrl) {
  throw new Error('Missing Supabase URL. Please set NEXT_PUBLIC_SUPABASE_URL');
}

if (!supabaseKey) {
  throw new Error('Missing Supabase key. Please set NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

// Створюємо клієнт Supabase
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false
  }
});

// Helper functions
export async function createPortrait(text: string, imageUrl: string): Promise<Portrait> {
  console.log('Creating portrait with:', { text, imageUrl });
  try {
    console.log('Supabase client config:', {
      url: supabaseUrl,
      hasKey: !!supabaseKey,
      keyLength: supabaseKey?.length
    });

    const { data, error } = await supabase
      .from('portraits')
      .insert([
        {
          text,
          imageUrl,
          reactions: {
            isMe: 0,
            isBeautiful: 0,
            isTouching: 0,
          },
        },
      ])
      .select()
      .single();

    console.log('Supabase response:', { 
      data, 
      error,
      errorDetails: error ? {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint
      } : null
    });

    if (error) {
      console.error('Supabase error:', error);
      throw new Error(`Failed to create portrait: ${error.message || 'Unknown error'}`);
    }

    if (!data) {
      console.error('No data returned from Supabase');
      throw new Error('No data returned from Supabase');
    }

    return data;
  } catch (error) {
    console.error('Error in createPortrait:', error);
    throw error;
  }
}

export async function getPortrait(id: string): Promise<Portrait> {
  const { data, error } = await supabase
    .from('portraits')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching portrait:', error);
    throw new Error('Failed to fetch portrait');
  }

  return data;
}

export async function incrementReaction(
  id: string,
  type: 'isMe' | 'isBeautiful' | 'isTouching'
): Promise<Portrait['reactions']> {
  const { data: portrait, error: fetchError } = await supabase
    .from('portraits')
    .select('reactions')
    .eq('id', id)
    .single();

  if (fetchError) {
    console.error('Error fetching portrait:', fetchError);
    throw new Error('Failed to fetch portrait');
  }

  const currentReactions = portrait.reactions || {
    isMe: 0,
    isBeautiful: 0,
    isTouching: 0,
  };

  const updatedReactions = {
    ...currentReactions,
    [type]: (currentReactions[type] || 0) + 1,
  };

  const { error: updateError } = await supabase
    .from('portraits')
    .update({ reactions: updatedReactions })
    .eq('id', id);

  if (updateError) {
    console.error('Error updating reactions:', updateError);
    throw new Error('Failed to update reactions');
  }

  return updatedReactions;
} 