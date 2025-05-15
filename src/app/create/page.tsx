'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import QuestionForm from '@/components/QuestionForm';
import { createPortrait } from '@/lib/supabase';

export default function CreatePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (answers: Record<string, string>) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate portrait');
      }

      const data = await response.json();
      router.push(`/result/${data.id}`);
    } catch (err) {
      console.error('Error generating portrait:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate portrait');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Створення вашого портрету...</p>
          <p className="text-sm text-gray-500 mt-2">Це може зайняти кілька хвилин</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Створіть свій психологічний портрет
          </h1>
          <p className="text-gray-600">
            Відповідайте на запитання, і наш AI створить унікальний портрет вашої особистості
          </p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="text-red-500 mb-2">😔</div>
            <p className="text-gray-900 font-medium mb-1">Щось пішло не так</p>
            <p className="text-gray-600">{error}</p>
          </div>
        )}

        <QuestionForm onSubmit={handleSubmit} />
      </div>
    </main>
  );
} 