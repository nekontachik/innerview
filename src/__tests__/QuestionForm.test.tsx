import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import QuestionForm from '@/components/QuestionForm';

describe('QuestionForm', () => {
  const mockOnSubmit = jest.fn();
  const questions = [
    'Опишіть свою особистість трьома словами',
    'Що для вас найважливіше в житті?',
    'Про що ви мрієте?',
    'Чого ви боїтесь?',
    'У чому ваша сила?'
  ];

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it('renders all questions', () => {
    render(<QuestionForm onSubmit={mockOnSubmit} />);
    
    questions.forEach(question => {
      expect(screen.getByText(new RegExp(question))).toBeInTheDocument();
    });
  });

  it('shows error when submitting empty form', async () => {
    render(<QuestionForm onSubmit={mockOnSubmit} />);
    
    const submitButton = screen.getByText('Створити портрет');
    fireEvent.click(submitButton);

    expect(await screen.findByText('Будь ласка, відповідайте на всі питання')).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('calls onSubmit with answers when form is valid', async () => {
    render(<QuestionForm onSubmit={mockOnSubmit} />);
    
    const answers = {
      personality: 'Творча, емоційна, цілеспрямована',
      values: 'Сім\'я, самореалізація',
      dreams: 'Подорожувати світом',
      fears: 'Не реалізувати потенціал',
      strengths: 'Емпатія, креативність'
    };
    
    const textareas = screen.getAllByRole('textbox');
    textareas.forEach((textarea) => {
      const id = textarea.id;
      fireEvent.change(textarea, { target: { value: answers[id as keyof typeof answers] } });
    });

    const submitButton = screen.getByText('Створити портрет');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(answers);
    });
  });

  it('shows loading state', () => {
    render(<QuestionForm onSubmit={mockOnSubmit} isSubmitting={true} />);
    
    expect(screen.getByText('Створення портрету...')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });
}); 