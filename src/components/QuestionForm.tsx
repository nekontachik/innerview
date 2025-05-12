'use client';

import { useState } from 'react';
import { QuestionFormProps } from '@/types';

const QUESTIONS = [
  'Що для вас означає щастя?',
  'Який момент вашого життя ви вважаєте найважливішим?',
  'Що б ви хотіли змінити в собі?'
];

export default function QuestionForm({ onSubmit, isLoading }: QuestionFormProps) {
  const [answers, setAnswers] = useState<string[]>(Array(3).fill(''));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (answers.some(answer => !answer.trim())) {
      alert('Будь ласка, відповідайте на всі питання');
      return;
    }
    await onSubmit(answers);
  };

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      {QUESTIONS.map((question, index) => (
        <div key={index} className="space-y-2">
          <label className="block text-lg font-medium text-gray-700">
            {question}
          </label>
          <textarea
            value={answers[index]}
            onChange={(e) => handleAnswerChange(index, e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4}
            placeholder="Ваша відповідь..."
            disabled={isLoading}
          />
        </div>
      ))}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Генеруємо портрет...' : 'Створити портрет'}
      </button>
    </form>
  );
} 