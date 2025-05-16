import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PortraitResult from '@/components/PortraitResult';
import { supabase } from '@/lib/supabase';

// Мокаємо залежності
jest.mock('@/lib/supabase', () => ({
  supabase: {
    from: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    single: jest.fn()
  }
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn()
  })
}));

// Мокаємо fetch
global.fetch = jest.fn();

describe('PortraitResult', () => {
  const mockPortrait = {
    id: '1',
    text: 'Test portrait text',
    image_url: 'https://example.com/image.jpg',
    created_at: '2024-03-20',
    reactions: {
      isMe: 5,
      isBeautiful: 3,
      isTouching: 2
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockClear();
  });

  it('renders portrait correctly', () => {
    render(<PortraitResult portrait={mockPortrait} />);
    
    expect(screen.getByText('Test portrait text')).toBeInTheDocument();
    expect(screen.getByAltText('Psychological portrait')).toHaveAttribute('src', 'https://example.com/image.jpg');
    expect(screen.getByText('5 Це про мене')).toBeInTheDocument();
    expect(screen.getByText('3 Красиво')).toBeInTheDocument();
    expect(screen.getByText('2 Зворушливо')).toBeInTheDocument();
  });

  it('handles reaction button clicks', async () => {
    const updatedPortrait = {
      ...mockPortrait,
      reactions: {
        isMe: 6,
        isBeautiful: 3,
        isTouching: 2
      }
    };

    (supabase.from('portraits').update().eq().select().single as jest.Mock).mockResolvedValue({
      data: updatedPortrait
    });

    render(<PortraitResult portrait={mockPortrait} />);
    
    const meButton = screen.getByText('5 Це про мене');
    fireEvent.click(meButton);

    await waitFor(() => {
      expect(supabase.from).toHaveBeenCalledWith('portraits');
    });

    // Перевіряємо, що компонент оновився з новими реакціями
    expect(screen.getByText('6 Це про мене')).toBeInTheDocument();
  });

  it('handles errors gracefully', async () => {
    (supabase.from('portraits').update().eq().select().single as jest.Mock).mockRejectedValue(new Error('Failed to update reactions'));

    render(<PortraitResult portrait={mockPortrait} />);
    
    const meButton = screen.getByText('5 Це про мене');
    fireEvent.click(meButton);

    await waitFor(() => {
      expect(screen.getByText('Помилка при оновленні реакцій')).toBeInTheDocument();
    });
  });
}); 