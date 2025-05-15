'use client';

import { useState } from 'react';

interface QuestionFormProps {
  onSubmit: (answers: Record<string, string>) => Promise<void>;
}

const questions = [
  {
    id: 'personality',
    text: 'Опишіть свою особистість трьома словами',
    placeholder: 'Наприклад: творча, емоційна, цілеспрямована'
  },
  {
    id: 'values',
    text: 'Що для вас найважливіше в житті?',
    placeholder: 'Наприклад: сім\'я, самореалізація, свобода'
  },
  {
    id: 'dreams',
    text: 'Про що ви мрієте?',
    placeholder: 'Наприклад: подорожувати світом, створити власний бізнес'
  },
  {
    id: 'fears',
    text: 'Чого ви боїтесь?',
    placeholder: 'Наприклад: не реалізувати свій потенціал, втратити близьких'
  },
  {
    id: 'strengths',
    text: 'У чому ваша сила?',
    placeholder: 'Наприклад: вміння знаходити рішення, емпатія'
  }
];

export default function QuestionForm({ onSubmit }: QuestionFormProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Перевіряємо, чи всі питання відповідені
    const unansweredQuestions = questions.filter(q => !answers[q.id]);
    if (unansweredQuestions.length > 0) {
      setError('Будь ласка, відповідайте на всі питання');
      return;
    }

    try {
      await onSubmit(answers);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Щось пішло не так');
    }
  };

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
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
          
          {questions.map((question, index) => (
            <div key={question.id} className="space-y-2">
              <label htmlFor={question.id} className="block text-lg font-medium text-gray-900">
                {index + 1}. {question.text}
              </label>
              <textarea
                id={question.id}
                value={answers[question.id] || ''}
                onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                placeholder={question.placeholder}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                rows={3}
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-lg font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
          >
            Створити портрет
          </button>
        </form>
      </div>
    </div>
  );
} 