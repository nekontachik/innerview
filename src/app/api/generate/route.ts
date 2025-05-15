import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { createPortrait } from '@/lib/supabase';
import { GeneratePortraitRequest, GeneratePortraitResponse } from '@/types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req: Request) {
  try {
    const { answers } = await req.json();

    if (!answers || typeof answers !== 'object') {
      return NextResponse.json(
        { error: 'Missing or invalid answers' },
        { status: 400 }
      );
    }

    // Генерація тексту портрету
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
    if (!portraitText) {
      throw new Error('Failed to generate portrait text');
    }

    // Генерація зображення
    const imageResponse = await openai.images.generate({
      model: 'dall-e-3',
      prompt: `Create a psychological portrait that represents: ${answers.personality}. The image should be abstract, artistic, and emotionally resonant. Use soft colors and flowing shapes.`,
      n: 1,
      size: '1024x1024',
      quality: 'standard',
      style: 'natural',
    });

    const imageUrl = imageResponse.data?.[0]?.url;
    if (!imageUrl) {
      throw new Error('Failed to generate portrait image');
    }

    // Збереження портрету
    const portrait = await createPortrait(portraitText, imageUrl);

    return NextResponse.json({
      id: portrait.id,
      text: portrait.text,
      imageUrl: portrait.image_url
    });
  } catch (error) {
    console.error('Error generating portrait:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate portrait' },
      { status: 500 }
    );
  }
} 