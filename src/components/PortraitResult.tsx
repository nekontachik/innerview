'use client';

import { useState } from 'react';
import { Portrait } from '@/types';

interface PortraitResultProps {
  portrait: Portrait;
}

export default function PortraitResult({ portrait }: PortraitResultProps) {
  const [isReacting, setIsReacting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleReaction = async (type: 'isMe' | 'isBeautiful' | 'isTouching') => {
    try {
      setIsReacting(true);
      setError(null);

      const response = await fetch(`/api/portraits/${portrait.id}/react`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update reaction');
      }

      const data = await response.json();
      // Оновлюємо локальний стан з новими реакціями
      portrait.reactions = data.reactions;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsReacting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative aspect-square">
        <img
          src={portrait.image_url}
          alt="Psychological portrait"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-6">
        <div className="prose max-w-none">
          <p className="text-gray-700 whitespace-pre-line">{portrait.text}</p>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-4">
          <button
            onClick={() => handleReaction('isMe')}
            disabled={isReacting}
            className={`flex-1 py-3 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              isReacting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {portrait.reactions?.isMe || 0} Це про мене
          </button>

          <button
            onClick={() => handleReaction('isBeautiful')}
            disabled={isReacting}
            className={`flex-1 py-3 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              isReacting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {portrait.reactions?.isBeautiful || 0} Красиво
          </button>

          <button
            onClick={() => handleReaction('isTouching')}
            disabled={isReacting}
            className={`flex-1 py-3 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              isReacting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {portrait.reactions?.isTouching || 0} Зворушливо
          </button>
        </div>
      </div>
    </div>
  );
} 