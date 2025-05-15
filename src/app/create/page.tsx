'use client';

import QuestionForm from '@/components/QuestionForm';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreatePage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (answers: string[]) => {
    setIsLoading(true);
    try {
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
    } catch (error) {
      console.error('Error generating portrait:', error);
      throw error; // Let QuestionForm handle the error display
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">
            Створення твого портрету
          </h1>
          <p className="mt-2 text-gray-600">
            Відповідай на питання від серця
          </p>
        </div>
        
        <QuestionForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </main>
  );
} 