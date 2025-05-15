import { NextResponse } from 'next/server';
import { compress } from 'bivvy';

export async function compressResponse(req: Request) {
  const response = await NextResponse.next();
  
  // Only compress JSON responses
  if (response.headers.get('content-type')?.includes('application/json')) {
    const body = await response.text();
    const compressed = await compress(body);
    
    return new NextResponse(compressed, {
      headers: {
        ...Object.fromEntries(response.headers),
        'content-encoding': 'gzip',
        'content-length': compressed.length.toString()
      }
    });
  }
  
  return response;
} 