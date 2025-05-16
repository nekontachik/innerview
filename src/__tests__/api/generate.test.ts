import { NextRequest } from 'next/server';
import { POST } from '@/app/api/generate/route';
import { createPortrait } from '@/lib/supabase';
import OpenAI from 'openai';

// Мокаємо змінні середовища
process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-key';

// Мокаємо залежності
jest.mock('@/lib/supabase');
jest.mock('openai', () => ({
  __esModule: true,
  default: jest.fn()
}));

// Мокаємо NextRequest
jest.mock('next/server', () => ({
  NextRequest: jest.fn().mockImplementation((url, init) => ({
    url,
    method: init?.method || 'GET',
    json: () => Promise.resolve(JSON.parse(init?.body || '{}'))
  }))
}));

describe('POST /api/generate', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should generate portrait and save it to database', async () => {
    // Мокаємо відповідь від OpenAI
    const mockTextResponse = {
      choices: [{
        message: {
          content: 'Test portrait text'
        }
      }]
    };

    const mockImageResponse = {
      data: [{
        url: 'https://example.com/image.jpg'
      }]
    };

    (OpenAI as unknown as jest.Mock).mockImplementation(() => ({
      chat: {
        completions: {
          create: jest.fn().mockResolvedValue(mockTextResponse)
        }
      },
      images: {
        generate: jest.fn().mockResolvedValue(mockImageResponse)
      }
    }));

    // Мокаємо відповідь від Supabase
    (createPortrait as jest.Mock).mockResolvedValue({
      id: '1',
      text: 'Test portrait text',
      image_url: 'https://example.com/image.jpg'
    });

    const request = new NextRequest('http://localhost:3000/api/generate', {
      method: 'POST',
      body: JSON.stringify({
        answers: {
          personality: 'Test personality',
          values: 'Test values',
          dreams: 'Test dreams',
          fears: 'Test fears',
          strengths: 'Test strengths'
        }
      })
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual({
      id: '1',
      text: 'Test portrait text',
      imageUrl: 'https://example.com/image.jpg'
    });
  });

  it('should handle missing answers', async () => {
    const request = new NextRequest('http://localhost:3000/api/generate', {
      method: 'POST',
      body: JSON.stringify({})
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Missing or invalid answers');
  });

  it('should handle OpenAI API errors', async () => {
    (OpenAI as unknown as jest.Mock).mockImplementation(() => ({
      chat: {
        completions: {
          create: jest.fn().mockRejectedValue(new Error('OpenAI API error'))
        }
      }
    }));

    const request = new NextRequest('http://localhost:3000/api/generate', {
      method: 'POST',
      body: JSON.stringify({
        answers: {
          personality: 'Test personality',
          values: 'Test values',
          dreams: 'Test dreams',
          fears: 'Test fears',
          strengths: 'Test strengths'
        }
      })
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe('Failed to generate portrait');
  });

  it('should handle Supabase errors', async () => {
    const mockTextResponse = {
      choices: [{
        message: {
          content: 'Test portrait text'
        }
      }]
    };

    const mockImageResponse = {
      data: [{
        url: 'https://example.com/image.jpg'
      }]
    };

    (OpenAI as unknown as jest.Mock).mockImplementation(() => ({
      chat: {
        completions: {
          create: jest.fn().mockResolvedValue(mockTextResponse)
        }
      },
      images: {
        generate: jest.fn().mockResolvedValue(mockImageResponse)
      }
    }));

    (createPortrait as jest.Mock).mockRejectedValue(new Error('Supabase error'));

    const request = new NextRequest('http://localhost:3000/api/generate', {
      method: 'POST',
      body: JSON.stringify({
        answers: {
          personality: 'Test personality',
          values: 'Test values',
          dreams: 'Test dreams',
          fears: 'Test fears',
          strengths: 'Test strengths'
        }
      })
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe('Failed to generate portrait');
  });
}); 