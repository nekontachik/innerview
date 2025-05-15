'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import QuestionForm from '@/components/QuestionForm';

export default function CreatePage() {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (answers: Record<string, string>) => {
    try {
      setIsGenerating(true);
      setError(null);

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to generate portrait');
      }

      const data = await response.json();
      router.push(`/result/${data.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-primary py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Створіть свій психологічний портрет
          </h1>
          <p className="text-lg text-gray-600">
            Відповідайте на запитання, щоб отримати унікальний портрет вашої особистості
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg p-6">
          <QuestionForm onSubmit={handleSubmit} isSubmitting={isGenerating} />
        </div>

        {isGenerating && (
          <div className="mt-6 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
            <p className="mt-2 text-gray-600">Генеруємо ваш портрет...</p>
          </div>
        )}
      </div>
    </div>
  );
} 