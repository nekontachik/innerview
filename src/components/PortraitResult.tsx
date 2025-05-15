'use client';

import { useState } from 'react';
import { PortraitResultProps } from '@/types';

export default function PortraitResult({ portrait, onReaction }: PortraitResultProps) {
  const [isReacting, setIsReacting] = useState(false);
  const [showCopied, setShowCopied] = useState(false);

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
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Portrait Text */}
        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Ваш внутрішній портрет</h2>
          <p className="text-lg leading-relaxed whitespace-pre-wrap text-gray-700">
            {portrait.text}
          </p>
        </div>

        {/* Portrait Image (if exists) */}
        {portrait.imageUrl && (
          <div className="mt-8">
            <img
              src={portrait.imageUrl}
              alt="AI Generated Portrait"
              className="w-full h-auto rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            />
          </div>
        )}

        {/* Reactions */}
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => handleReaction('isMe')}
            disabled={isReacting}
            className="px-6 py-3 bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-200 disabled:opacity-50 transition-all duration-200 transform hover:scale-105"
          >
            <span className="font-medium">Це про мене</span>
            <span className="ml-2 text-sm bg-blue-200 px-2 py-1 rounded-full">
              {portrait.reactions.isMe}
            </span>
          </button>
          <button
            onClick={() => handleReaction('isBeautiful')}
            disabled={isReacting}
            className="px-6 py-3 bg-pink-100 text-pink-700 rounded-xl hover:bg-pink-200 disabled:opacity-50 transition-all duration-200 transform hover:scale-105"
          >
            <span className="font-medium">Красиво</span>
            <span className="ml-2 text-sm bg-pink-200 px-2 py-1 rounded-full">
              {portrait.reactions.isBeautiful}
            </span>
          </button>
          <button
            onClick={() => handleReaction('isTouching')}
            disabled={isReacting}
            className="px-6 py-3 bg-purple-100 text-purple-700 rounded-xl hover:bg-purple-200 disabled:opacity-50 transition-all duration-200 transform hover:scale-105"
          >
            <span className="font-medium">Зворушливо</span>
            <span className="ml-2 text-sm bg-purple-200 px-2 py-1 rounded-full">
              {portrait.reactions.isTouching}
            </span>
          </button>
        </div>

        <button
          onClick={handleShare}
          className="w-full px-6 py-4 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl hover:from-gray-200 hover:to-gray-300 transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          {showCopied ? 'Скопійовано!' : 'Поділитися'}
        </button>
      </div>
    </div>
  );
} 