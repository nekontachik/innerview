-- Create portraits table
CREATE TABLE portraits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  text TEXT NOT NULL,
  imageUrl TEXT,
  reactions JSONB DEFAULT '{"isMe": 0, "isBeautiful": 0, "isTouching": 0}'::jsonb NOT NULL
);

-- Create function to increment reaction
CREATE OR REPLACE FUNCTION increment_reaction(portrait_id UUID, reaction_type TEXT)
RETURNS JSONB AS $$
DECLARE
  updated_reactions JSONB;
BEGIN
  UPDATE portraits
  SET reactions = jsonb_set(
    reactions,
    array[reaction_type],
    to_jsonb((COALESCE((reactions->>reaction_type)::int, 0) + 1)::text)
  )
  WHERE id = portrait_id
  RETURNING reactions INTO updated_reactions;

  IF updated_reactions IS NULL THEN
    RAISE EXCEPTION 'Portrait with ID % not found', portrait_id;
  END IF;

  RETURN updated_reactions;
END;
$$ LANGUAGE plpgsql; 