# InnerView

AI-powered psychological portrait generator.

## Deployment on Render.com

1. Create an account on [Render.com](https://render.com)
2. Connect your GitHub repository
3. Create a new Web Service:
   - Select your repository
   - Name: `innerview`
   - Environment: `Node`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
4. Configure environment variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   OPENAI_API_KEY=your_openai_api_key
   UPSTASH_REDIS_URL=your_redis_url
   UPSTASH_REDIS_TOKEN=your_redis_token
   NEXT_PUBLIC_APP_URL=https://innerview.onrender.com
   ```
5. Deploy!

## Local Development

```bash
npm install
npm run dev
```

## Testing

```bash
npm test
npm run test:watch
```

## Технології

- Next.js 14
- TypeScript
- Tailwind CSS
- OpenAI API
- Supabase

## Локальна розробка

1. Клонуйте репозиторій:
```bash
git clone https://github.com/yourusername/innerview.git
cd innerview
```

2. Встановіть залежності:
```bash
npm install
```

3. Створіть файл `.env.local` з наступними змінними:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. Запустіть сервер розробки:
```bash
npm run dev
```

## База даних

1. Створіть проект в Supabase
2. Виконайте SQL міграцію:
```sql
CREATE TABLE portraits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  text TEXT NOT NULL,
  image_url TEXT,
  reactions JSONB DEFAULT '{"isMe": 0, "isBeautiful": 0, "isTouching": 0}'::jsonb NOT NULL
);

CREATE INDEX idx_portraits_createdat ON portraits(created_at);

CREATE OR REPLACE FUNCTION increment_reaction(portrait_id UUID, reaction_type TEXT)
RETURNS JSONB AS $$
BEGIN
  UPDATE portraits
  SET reactions = jsonb_set(
    reactions,
    array[reaction_type],
    to_jsonb((reactions->>reaction_type)::int + 1)
  )
  WHERE id = portrait_id
  RETURNING reactions;
END;
$$ LANGUAGE plpgsql;
```

## Ліцензія

MIT 