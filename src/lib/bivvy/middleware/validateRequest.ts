import { NextResponse } from 'next/server';
import { z } from 'zod';

const schemas = {
  '/api/generate': z.object({
    answers: z.array(z.string().min(10).max(500)).min(3).max(3)
  }),
  '/api/react': z.object({
    portraitId: z.string().uuid(),
    reactionType: z.enum(['isMe', 'isBeautiful', 'isTouching'])
  })
};

export async function validateRequest(req: Request) {
  const url = new URL(req.url);
  const schema = schemas[url.pathname as keyof typeof schemas];
  
  if (!schema) return null;
  
  try {
    const body = await req.json();
    await schema.parseAsync(body);
    return null;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request body', details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
} 