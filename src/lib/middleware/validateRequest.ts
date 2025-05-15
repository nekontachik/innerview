import { NextResponse } from 'next/server';
import { z } from 'zod';

// Схеми валідації
export const createPortraitSchema = z.object({
  text: z.string().min(1, 'Text is required'),
  image_url: z.string().url('Invalid image URL')
});

export const updateReactionSchema = z.object({
  reactionType: z.enum(['isMe', 'isBeautiful', 'isTouching'], {
    errorMap: () => ({ message: 'Invalid reaction type' })
  })
});

// Функція для валідації запиту
export function validateRequest<T>(schema: z.Schema<T>, data: unknown) {
  try {
    return { data: schema.parse(data), error: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        data: null,
        error: {
          message: 'Validation failed',
          details: error.errors.map(err => ({
            path: err.path.join('.'),
            message: err.message
          }))
        }
      };
    }
    return {
      data: null,
      error: {
        message: 'Invalid request data',
        details: []
      }
    };
  }
}

// Middleware для валідації тіла запиту
export async function validateRequestBody<T>(request: Request, schema: z.Schema<T>) {
  try {
    const body = await request.json();
    return validateRequest(schema, body);
  } catch (error) {
    return {
      data: null,
      error: {
        message: 'Invalid JSON in request body',
        details: []
      }
    };
  }
} 