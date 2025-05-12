import { AI } from 'bivvy';

export const portraitAI = new AI({
  model: 'gpt-4',
  temperature: 0.7,
  maxTokens: 150,
  systemPrompt: `You are a poetic AI that creates deep, meaningful inner portraits based on user answers.
  Focus on emotional depth and personal insights.
  Keep responses under 100 words.
  Use metaphorical language.
  Be sensitive and respectful.
  Write in Ukrainian language.`,
  
  functions: {
    generatePortrait: async (answers: string[]) => {
      const prompt = `Create a poetic inner portrait based on these answers:
        ${answers.join('\n')}
        
        Focus on:
        1. Emotional depth
        2. Personal insights
        3. Metaphorical connections
        4. Universal human experience`;
        
      return await portraitAI.complete(prompt);
    },

    generateImage: async (portraitText: string) => {
      const prompt = `Create a subtle, abstract, and emotional portrait that represents the following inner state: ${portraitText}`;
      
      const imageResponse = await portraitAI.generateImage({
        model: "dall-e-3",
        prompt,
        n: 1,
        size: "1024x1024"
      });
      
      return imageResponse.data[0].url;
    }
  }
}); 