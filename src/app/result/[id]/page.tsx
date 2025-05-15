'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getPortrait, incrementReaction } from '@/lib/supabase';
import { Portrait } from '@/types';
import PortraitResult from '@/components/PortraitResult';

interface ResultPageProps {
  params: {
    id: string;
  };
}

export default function ResultPage({ params }: ResultPageProps) {
  const [portrait, setPortrait] = useState<Portrait | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function loadPortrait() {
      try {
        setIsLoading(true);
        const data = await getPortrait(params.id);
        setPortrait(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load portrait');
      } finally {
        setIsLoading(false);
      }
    }

    loadPortrait();
  }, [params.id]);

  const handleReaction = async (type: 'isMe' | 'isBeautiful' | 'isTouching') => {
    if (!portrait) return;

    try {
      const updatedReactions = await incrementReaction(portrait.id, type);
      setPortrait(prev => prev ? { ...prev, reactions: updatedReactions } : null);
    } catch (err) {
      console.error('Failed to update reaction:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Завантаження портрету...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">😔</div>
          <p className="text-gray-900 font-medium mb-2">Щось пішло не так</p>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Повернутися на головну
          </button>
        </div>
      </div>
    );
  }

  if (!portrait) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-500 mb-4">🔍</div>
          <p className="text-gray-900 font-medium mb-2">Портрет не знайдено</p>
          <p className="text-gray-600 mb-4">Можливо, він був видалений або посилання неправильне</p>
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Створити новий портрет
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <PortraitResult portrait={portrait} onReaction={handleReaction} />
      </div>
    </main>
  );
} 