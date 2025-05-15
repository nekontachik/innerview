import { portraitAI } from './ai';
import { db } from './db';
import { ApiError } from '@/lib/errors';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!
});

const METRICS_PREFIX = 'metrics:';

export const handlers = {
  generatePortrait: async (req: Request) => {
    try {
      const { answers } = await req.json();
      
      // Generate portrait text
      const portraitText = await portraitAI.generatePortrait(answers);
      if (!portraitText) {
        throw new ApiError('Failed to generate portrait text', 500);
      }
      
      // Generate image (optional)
      let imageUrl;
      try {
        imageUrl = await portraitAI.generateImage(portraitText);
      } catch (error) {
        console.error('Failed to generate image:', error);
      }
      
      // Store in database
      const portrait = await db.portraits.create({
        text: portraitText,
        imageUrl,
        reactions: {
          isMe: 0,
          isBeautiful: 0,
          isTouching: 0
        }
      });
      
      if (!portrait) {
        throw new ApiError('Failed to save portrait', 500);
      }
      
      return portrait;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError('Failed to generate portrait', 500, error);
    }
  },
  
  handleReaction: async (req: Request) => {
    try {
      const { portraitId, reactionType } = await req.json();
      
      const portrait = await db.portraits.update(portraitId, {
        reactions: {
          [reactionType]: db.raw(`reactions->>'${reactionType}'::integer + 1`)
        }
      });
      
      if (!portrait) {
        throw new ApiError('Portrait not found', 404);
      }
      
      return portrait.reactions;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError('Failed to update reaction', 500, error);
    }
  },

  getMetrics: async () => {
    try {
      const keys = await redis.keys(`${METRICS_PREFIX}*`);
      const metrics = await Promise.all(
        keys.map(async (key) => {
          const value = await redis.get(key);
          return [key.replace(METRICS_PREFIX, ''), value];
        })
      );

      return Object.fromEntries(metrics);
    } catch (error) {
      throw new ApiError('Failed to fetch metrics', 500, error);
    }
  }
}; 