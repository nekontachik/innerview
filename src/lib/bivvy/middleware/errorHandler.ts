import { NextResponse } from 'next/server';

interface ApiError {
  message: string;
  status: number;
  details?: unknown;
}

export async function errorHandler(error: unknown) {
  console.error('API Error:', error);
  
  const apiError = error as ApiError;
  if (apiError?.status && apiError?.message) {
    return NextResponse.json(
      { error: apiError.message, details: apiError.details },
      { status: apiError.status }
    );
  }
  
  return NextResponse.json(
    { error: 'Internal server error' },
    { status: 500 }
  );
} 