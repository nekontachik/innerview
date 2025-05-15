---
id: innerview
type: feature
description: AI-powered inner portrait generation platform
status: climbing
---

# InnerView - AI Portrait Generation Platform

## Overview
InnerView is a platform that generates deep, meaningful inner portraits based on user answers to three personal questions. The portraits are generated using AI and can optionally include visual representations.

## Core Features
1. Question Form
   - Three deep, personal questions
   - Input validation
   - Submit button with loading state

2. Portrait Generation
   - AI-generated text portrait
   - Optional DALL-E image generation
   - Loading states and error handling

3. Results Display
   - Portrait text display
   - Optional image display
   - Reaction system (isMe, isBeautiful, isTouching)

## Technical Stack
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- OpenAI API (GPT-4, DALL-E)
- Supabase (PostgreSQL)

## Dependencies
- next
- react
- react-dom
- @supabase/supabase-js
- openai
- uuid
- tailwindcss
- typescript

## Files
- src/app/page.tsx (Homepage)
- src/app/create/page.tsx (Question Form)
- src/app/result/[id]/page.tsx (Portrait Display)
- src/components/QuestionForm.tsx
- src/components/PortraitResult.tsx
- src/lib/openai.ts
- src/lib/supabase.ts
- src/types/index.ts

## Database Schema
```sql
CREATE TABLE portraits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  text TEXT NOT NULL,
  imageUrl TEXT,
  createdAt TIMESTAMP DEFAULT NOW(),
  reactions JSONB DEFAULT '{"isMe": 0, "isBeautiful": 0, "isTouching": 0}'::jsonb
);
```

## API Routes
- POST /api/generate
  - Input: answers (string[])
  - Output: { id, text, imageUrl }

- POST /api/react
  - Input: { portraitId, reactionType }
  - Output: updated reactions

## Success Criteria
1. Users can submit answers and get AI-generated portraits
2. Portraits are stored in the database
3. Users can react to portraits
4. The UI is responsive and user-friendly
5. Error handling is in place
6. Rate limiting is implemented 