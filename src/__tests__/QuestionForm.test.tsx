import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import QuestionForm from '@/components/QuestionForm';

describe('QuestionForm', () => {
  const mockOnSubmit = jest.fn();
  const questions = [
    'Що для вас означає щастя?',
    'Що б ви хотіли змінити в собі?',
    'Який момент вашого життя ви вважаєте найважливішим?'
  ];

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it('renders all questions', () => {
    render(<QuestionForm onSubmit={mockOnSubmit} />);
    
    questions.forEach(question => {
      expect(screen.getByText(question)).toBeInTheDocument();
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
    
    const answers = ['Щастя - це...', 'Я хотів би...', 'Найважливіший момент...'];
    
    const textareas = screen.getAllByRole('textbox');
    textareas.forEach((textarea, index) => {
      fireEvent.change(textarea, { target: { value: answers[index] } });
    });

    const submitButton = screen.getByText('Створити портрет');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(answers);
    });
  });

  it('shows loading state', () => {
    render(<QuestionForm onSubmit={mockOnSubmit} isLoading={true} />);
    
    expect(screen.getByText('Генеруємо портрет...')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });
}); 