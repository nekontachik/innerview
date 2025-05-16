import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { createPortrait } from '@/lib/supabase';
import { GeneratePortraitRequest, GeneratePortraitResponse } from '@/types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req: Request) {
  try {
    console.log('Starting portrait generation...');
    const { answers } = await req.json();
    console.log('Received answers:', answers);

    if (!answers || typeof answers !== 'object') {
      console.error('Invalid answers format:', answers);
      return NextResponse.json(
        { error: 'Missing or invalid answers' },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      console.error('OpenAI API key is missing');
      return NextResponse.json(
        { error: 'OpenAI API key is not configured' },
        { status: 500 }
      );
    }

    // Генерація тексту портрету
    console.log('Generating portrait text...');
    const textResponse = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `Ви - психолог, який створює детальний психологічний портрет на основі відповідей людини.
          Використовуйте емпатію та професійний підхід. Відповідь має бути українською мовою.`
        },
        {
          role: 'user',
          content: `Створіть психологічний портрет на основі цих відповідей:
            Особистість: ${answers.personality}
            Цінності: ${answers.values}
            Мрії: ${answers.dreams}
            Страхи: ${answers.fears}
            Сильні сторони: ${answers.strengths}`
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const portraitText = textResponse.choices[0]?.message?.content;
    console.log('Generated portrait text:', portraitText?.substring(0, 100) + '...');

    if (!portraitText) {
      console.error('Failed to generate portrait text');
      throw new Error('Failed to generate portrait text');
    }

    // Генерація зображення
    console.log('Generating portrait image...');
    const imageResponse = await openai.images.generate({
      model: 'dall-e-3',
      prompt: `Create a psychological portrait that represents: ${answers.personality}. The image should be abstract, artistic, and emotionally resonant. Use soft colors and flowing shapes.`,
      n: 1,
      size: '1024x1024',
      quality: 'standard',
      style: 'natural',
    });

    const imageUrl = imageResponse.data?.[0]?.url;
    console.log('Generated image URL:', imageUrl);

    if (!imageUrl) {
      console.error('Failed to generate portrait image');
      throw new Error('Failed to generate portrait image');
    }

    // Збереження портрету
    console.log('Saving portrait to database...');
    const portrait = await createPortrait(portraitText, imageUrl);
    console.log('Portrait saved successfully:', portrait.id);

    return NextResponse.json({
      id: portrait.id,
      text: portrait.text,
      imageUrl: portrait.imageUrl
    });
  } catch (error) {
    console.error('Error generating portrait:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate portrait' },
      { status: 500 }
    );
  }
} 