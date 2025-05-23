-- Create portraits table
CREATE TABLE portraits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  text TEXT NOT NULL,
  imageUrl TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  reactions JSONB DEFAULT '{"isMe": 0, "isBeautiful": 0, "isTouching": 0}'::jsonb NOT NULL
);

-- Create index on createdat
CREATE INDEX IF NOT EXISTS idx_portraits_createdat ON portraits(created_at);

-- Create function to increment reaction
CREATE OR REPLACE FUNCTION increment_reaction(portrait_id UUID, reaction_type TEXT)
RETURNS JSONB
LANGUAGE plpgsql
AS $$
DECLARE
  updated_reactions JSONB;
BEGIN
  UPDATE portraits
  SET reactions = jsonb_set(
    reactions,
    array[reaction_type],
    to_jsonb((reactions->>reaction_type)::int + 1)
  )
  WHERE id = portrait_id
  RETURNING reactions INTO updated_reactions;
  
  RETURN updated_reactions;
END;
$$; 