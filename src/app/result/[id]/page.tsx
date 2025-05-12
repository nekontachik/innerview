'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import PortraitResult from '@/components/PortraitResult';
import { Portrait } from '@/types';

export default function ResultPage() {
  const { id } = useParams();
  const [portrait, setPortrait] = useState<Portrait | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortrait = async () => {
      try {
        const response = await fetch(`/api/portraits/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch portrait');
        }
        const data = await response.json();
        setPortrait(data);
      } catch (error) {
        console.error('Error:', error);
        setError('Не вдалося завантажити портрет');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortrait();
  }, [id]);

  const handleReaction = async (type: 'isMe' | 'isBeautiful' | 'isTouching') => {
    if (!portrait) return;

    try {
      const response = await fetch('/api/react', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          portraitId: portrait.id,
          reactionType: type
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update reaction');
      }

      const updatedReactions = await response.json();
      setPortrait(prev => prev ? { ...prev, reactions: updatedReactions } : null);
    } catch (error) {
      console.error('Error:', error);
      alert('Помилка при оновленні реакції');
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Завантаження портрету...</p>
        </div>
      </main>
    );
  }

  if (error || !portrait) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Портрет не знайдено'}</p>
          <a href="/" className="text-blue-600 hover:underline">
            Повернутися на головну
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Ваш психологічний портрет
        </h1>
        <PortraitResult portrait={portrait} onReaction={handleReaction} />
      </div>
    </main>
  );
} 