import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!
});

const WINDOW_SIZE = 60; // 1 minute
const MAX_REQUESTS = 10; // 10 requests per minute

export async function rateLimit(req: Request) {
  const ip = req.headers.get('x-forwarded-for') || 'unknown';
  const key = `rate-limit:${ip}`;
  
  const requests = await redis.incr(key);
  if (requests === 1) {
    await redis.expire(key, WINDOW_SIZE);
  }
  
  if (requests > MAX_REQUESTS) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429 }
    );
  }
  
  return null;
} 