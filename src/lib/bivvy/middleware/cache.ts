import { NextResponse } from 'next/server';

const CACHE_DURATION = 60 * 60; // 1 hour

export async function cacheResponse(req: Request) {
  const response = await NextResponse.next();
  
  // Only cache GET requests
  if (req.method === 'GET') {
    response.headers.set('Cache-Control', `public, max-age=${CACHE_DURATION}`);
    response.headers.set('Vary', 'Accept-Encoding');
  }
  
  return response;
} 