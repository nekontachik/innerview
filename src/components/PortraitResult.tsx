'use client';

import { useState } from 'react';
import { PortraitResultProps } from '@/types';

export default function PortraitResult({ portrait, onReaction }: PortraitResultProps) {
  const [isReacting, setIsReacting] = useState(false);

  const handleReaction = async (type: 'isMe' | 'isBeautiful' | 'isTouching') => {
    setIsReacting(true);
    try {
      await onReaction(type);
    } finally {
      setIsReacting(false);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert('Посилання скопійовано!');
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Portrait Text */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="text-lg leading-relaxed whitespace-pre-wrap">
          {portrait.text}
        </p>
      </div>

      {/* Portrait Image (if exists) */}
      {portrait.imageurl && (
        <div className="relative aspect-square">
          <img
            src={portrait.imageurl}
            alt="AI Generated Portrait"
            className="rounded-lg shadow-lg w-full h-full object-cover"
          />
        </div>
      )}

      {/* Reactions */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => handleReaction('isMe')}
          disabled={isReacting}
          className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 disabled:opacity-50"
        >
          Це про мене ({portrait.reactions.isMe})
        </button>
        <button
          onClick={() => handleReaction('isBeautiful')}
          disabled={isReacting}
          className="px-4 py-2 bg-pink-100 text-pink-700 rounded-lg hover:bg-pink-200 disabled:opacity-50"
        >
          Красиво ({portrait.reactions.isBeautiful})
        </button>
        <button
          onClick={() => handleReaction('isTouching')}
          disabled={isReacting}
          className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 disabled:opacity-50"
        >
          Зворушливо ({portrait.reactions.isTouching})
        </button>
      </div>

      <button
        onClick={handleShare}
        className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
      >
        Поділитися
      </button>
    </div>
  );
} 