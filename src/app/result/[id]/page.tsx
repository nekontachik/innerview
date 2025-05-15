'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import PortraitResult from '@/components/PortraitResult';

interface Portrait {
  id: string;
  text: string;
  image_url: string;
  created_at: string;
  reactions: {
    isMe: number;
    isBeautiful: number;
    isTouching: number;
  };
}

export default function ResultPage() {
  const { id } = useParams();
  const [portrait, setPortrait] = useState<Portrait | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortrait = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`/api/portraits/${id}`);
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Failed to fetch portrait');
        }

        const data = await response.json();
        setPortrait(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortrait();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-primary flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Завантажуємо ваш портрет...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-primary flex items-center justify-center">
        <div className="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-lg">
          <div className="text-center">
            <div className="text-red-500 text-5xl mb-4">😔</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Щось пішло не так</h2>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!portrait || !portrait.id || !portrait.created_at || !portrait.image_url || !portrait.reactions) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-primary py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <PortraitResult portrait={portrait} />
      </div>
    </div>
  );
} 