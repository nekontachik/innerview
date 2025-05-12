import { defineConfig } from 'bivvy';

export default defineConfig({
  api: {
    routes: {
      '/api/generate': {
        method: 'POST',
        handler: 'generatePortrait',
        validation: {
          body: {
            answers: {
              type: 'array',
              items: { type: 'string', minLength: 10, maxLength: 500 },
              minItems: 3,
              maxItems: 3
            }
          }
        }
      },
      '/api/react': {
        method: 'POST',
        handler: 'handleReaction',
        validation: {
          body: {
            portraitId: { type: 'string', format: 'uuid' },
            reactionType: { 
              type: 'string', 
              enum: ['isMe', 'isBeautiful', 'isTouching'] 
            }
          }
        }
      }
    },
    middleware: [
      'rateLimit',
      'validateRequest',
      'errorHandler'
    ]
  },
  database: {
    schema: {
      portraits: {
        id: 'uuid',
        text: 'text',
        imageUrl: 'text?',
        createdAt: 'timestamp',
        reactions: 'jsonb'
      }
    }
  }
}); 