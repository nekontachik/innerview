import { portraitAI } from './ai';
import { db } from './db';

export const handlers = {
  generatePortrait: async (req: Request) => {
    const { answers } = await req.json();
    
    // Generate portrait text
    const portraitText = await portraitAI.generatePortrait(answers);
    
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
    
    return portrait;
  },
  
  handleReaction: async (req: Request) => {
    const { portraitId, reactionType } = await req.json();
    
    const portrait = await db.portraits.update(portraitId, {
      reactions: {
        [reactionType]: db.raw(`reactions->>'${reactionType}'::integer + 1`)
      }
    });
    
    return portrait.reactions;
  }
}; 