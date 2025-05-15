'use client';

import QuestionForm from '@/components/QuestionForm';
import { useState } from 'react';

export default function CreatePage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (answers: string[]) => {
    setIsLoading(true);
    try {
      // TODO: Implement API call to generate portrait
      console.log('Answers:', answers);
    } catch (error) {
      console.error('Error generating portrait:', error);
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