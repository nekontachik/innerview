import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { createPortrait } from '@/lib/supabase';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req: Request) {
  try {
    const { answers } = await req.json();

    // Generate portrait text
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "Ти - експерт з психології та літератури. Твоє завдання - створити літературний портрет людини на основі її відповідей. Портрет має бути написаний від третьої особи, використовувати метафори та бути емоційним. Довжина - 2-3 абзаци."
        },
        {
          role: "user",
          content: `Створи психологічний портрет на основі цих відповідей:\n\n${answers.join('\n\n')}`
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    const portraitText = completion.choices[0].message.content;
    if (!portraitText) {
      throw new Error('Failed to generate portrait text');
    }

    // Generate portrait image
    const imageResponse = await openai.images.generate({
      model: "dall-e-3",
      prompt: `Create a portrait that represents this psychological description: ${portraitText}. Style: artistic, emotional, abstract.`,
      n: 1,
      size: "1024x1024"
    });

    const imageUrl = imageResponse.data?.[0]?.url;
    if (!imageUrl) {
      throw new Error('Failed to generate portrait image');
    }

    // Save to database
    const portrait = await createPortrait(portraitText, imageUrl);

    return NextResponse.json(portrait);
  } catch (error) {
    console.error('Error generating portrait:', error);
    return NextResponse.json(
      { error: 'Failed to generate portrait' },
      { status: 500 }
    );
  }
} 