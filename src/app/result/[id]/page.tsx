'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import PortraitResult from '@/components/PortraitResult';
import { Portrait, ResultPageProps } from '@/types';

export default function ResultPage({ params }: ResultPageProps) {
  const [portrait, setPortrait] = useState<Portrait | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleReaction = async (type: 'isMe' | 'isBeautiful' | 'isTouching') => {
    try {
      const response = await fetch(`/api/portraits/${params.id}/react`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reactionType: type }),
      });

      if (!response.ok) throw new Error('Failed to submit reaction');

      const data = await response.json();
      setPortrait(prev => prev ? { ...prev, reactions: data } : null);
    } catch (err) {
      console.error('Error submitting reaction:', err);
      setError('Failed to submit reaction. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Завантажуємо ваш портрет...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Спробувати ще раз
          </button>
        </div>
      </div>
    );
  }

  if (!portrait) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Портрет не знайдено</p>
          <a
            href="/create"
            className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Створити новий портрет
          </a>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="prose max-w-none mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Ваш психологічний портрет
            </h1>
            <p className="text-gray-600 whitespace-pre-wrap">{portrait.text}</p>
          </div>

          {portrait.imageUrl && (
            <div className="mt-8">
              <img
                src={portrait.imageUrl}
                alt="AI Generated Portrait"
                className="w-full h-auto rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              />
            </div>
          )}

          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">Реакції</h2>
            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => handleReaction('isMe')}
                className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <div className="text-2xl mb-2">👤</div>
                <div className="font-medium">Це я</div>
                <div className="text-sm text-gray-600">{portrait.reactions.isMe}</div>
              </button>
              <button
                onClick={() => handleReaction('isBeautiful')}
                className="p-4 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors"
              >
                <div className="text-2xl mb-2">✨</div>
                <div className="font-medium">Красиво</div>
                <div className="text-sm text-gray-600">{portrait.reactions.isBeautiful}</div>
              </button>
              <button
                onClick={() => handleReaction('isTouching')}
                className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
              >
                <div className="text-2xl mb-2">💝</div>
                <div className="font-medium">Зворушливо</div>
                <div className="text-sm text-gray-600">{portrait.reactions.isTouching}</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 