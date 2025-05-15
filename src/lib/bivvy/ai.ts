import { AI } from 'bivvy';
import { ApiError } from '@/lib/errors';

export const portraitAI = new AI({
  model: 'gpt-4',
  temperature: 0.7,
  maxTokens: 500,
  systemPrompt: `You are a poetic AI that creates deep, meaningful inner portraits based on user answers.
  Focus on emotional depth and personal insights.
  Keep responses between 200-300 words.
  Use metaphorical language and literary devices.
  Be sensitive and respectful.
  Write in Ukrainian language.
  Structure the portrait in 2-3 paragraphs.
  Each paragraph should focus on a different aspect of the person's inner world.`,
  
  functions: {
    generatePortrait: async (answers: string[]) => {
      try {
        const prompt = `Create a poetic inner portrait based on these answers:
          ${answers.join('\n\n')}
          
          Guidelines:
          1. Emotional depth - explore the feelings and emotions behind the answers
          2. Personal insights - reveal unique aspects of the person's character
          3. Metaphorical connections - use metaphors to illustrate personality traits
          4. Universal human experience - connect personal answers to broader human themes
          5. Structure - use 2-3 paragraphs, each focusing on a different aspect
          6. Language - use rich, poetic Ukrainian language with literary devices`;
          
        const response = await portraitAI.complete(prompt);
        if (!response) {
          throw new ApiError('Failed to generate portrait text', 500);
        }
        return response;
      } catch (error) {
        console.error('Error generating portrait:', error);
        throw new ApiError('Failed to generate portrait', 500, error);
      }
    },

    generateImage: async (portraitText: string) => {
      try {
        const prompt = `Create a subtle, abstract, and emotional portrait that represents the following inner state: ${portraitText}
          
          Style guidelines:
          1. Abstract and symbolic
          2. Emotional and atmospheric
          3. Subtle color palette
          4. Artistic composition
          5. No text or words
          6. No faces or recognizable features`;
        
        const imageResponse = await portraitAI.generateImage({
          model: "dall-e-3",
          prompt,
          n: 1,
          size: "1024x1024",
          quality: "standard",
          style: "vivid"
        });
        
        if (!imageResponse.data?.[0]?.url) {
          throw new ApiError('Failed to generate portrait image', 500);
        }
        
        return imageResponse.data[0].url;
      } catch (error) {
        console.error('Error generating image:', error);
        throw new ApiError('Failed to generate portrait image', 500, error);
      }
    }
  }
}); 