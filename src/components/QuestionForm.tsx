'use client';

import { useState } from 'react';
import { QuestionFormProps } from '@/types';

const QUESTIONS = [
  'Що для вас означає щастя?',
  'Що б ви хотіли змінити в собі?',
  'Який момент вашого життя ви вважаєте найважливішим?'
];

export default function QuestionForm({ onSubmit, isLoading }: QuestionFormProps) {
  const [answers, setAnswers] = useState<string[]>(Array(QUESTIONS.length).fill(''));
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (answers.some(answer => !answer.trim())) {
      setError('Будь ласка, відповідайте на всі питання');
      return;
    }

    try {
      await onSubmit(answers);
    } catch (err) {
      setError('Сталася помилка при створенні портрету. Спробуйте ще раз.');
      console.error('Error submitting form:', err);
    }
  };

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Створіть свій внутрішній портрет
          </h1>
          <p className="text-lg text-gray-600">
            Відповідайте на питання від душі, і ми створимо унікальний портрет вашої внутрішньої сутності
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-2xl shadow-xl">
          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-lg border border-red-200">
              <p className="font-medium">Помилка</p>
              <p>{error}</p>
            </div>
          )}
          
          {QUESTIONS.map((question, index) => (
            <div key={index} className="space-y-3">
              <label className="block text-xl font-semibold text-gray-800">
                {question}
              </label>
              <textarea
                value={answers[index]}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                rows={4}
                placeholder="Напишіть вашу відповідь тут..."
                disabled={isLoading}
                required
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-lg font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Генеруємо портрет...
              </span>
            ) : (
              'Створити портрет'
            )}
          </button>
        </form>
      </div>
    </div>
  );
} 