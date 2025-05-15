import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PortraitResult from '@/components/PortraitResult';

describe('PortraitResult', () => {
  const mockPortrait = {
    id: '1',
    text: 'Test portrait text',
    imageUrl: 'https://example.com/image.jpg',
    createdAt: '2024-03-20',
    reactions: {
      isMe: 5,
      isBeautiful: 3,
      isTouching: 2
    }
  };

  const mockOnReaction = jest.fn();

  beforeEach(() => {
    mockOnReaction.mockClear();
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn()
      }
    });
  });

  it('renders portrait text', () => {
    render(<PortraitResult portrait={mockPortrait} onReaction={mockOnReaction} />);
    expect(screen.getByText(mockPortrait.text)).toBeInTheDocument();
  });

  it('renders portrait image if available', () => {
    render(<PortraitResult portrait={mockPortrait} onReaction={mockOnReaction} />);
    const image = screen.getByAltText('AI Generated Portrait');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockPortrait.imageUrl);
  });

  it('handles reaction clicks', async () => {
    render(<PortraitResult portrait={mockPortrait} onReaction={mockOnReaction} />);
    
    const reactionButton = screen.getByText('Це про мене');
    fireEvent.click(reactionButton);

    await waitFor(() => {
      expect(mockOnReaction).toHaveBeenCalledWith('isMe');
    });
  });

  it('handles share button click', async () => {
    render(<PortraitResult portrait={mockPortrait} onReaction={mockOnReaction} />);
    
    const shareButton = screen.getByText('Поділитися');
    fireEvent.click(shareButton);

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(window.location.href);
      expect(screen.getByText('Скопійовано!')).toBeInTheDocument();
    });
  });

  it('disables reaction buttons while reacting', async () => {
    render(<PortraitResult portrait={mockPortrait} onReaction={mockOnReaction} />);
    
    const reactionButton = screen.getByText('Це про мене');
    fireEvent.click(reactionButton);

    expect(reactionButton).toBeDisabled();
    
    await waitFor(() => {
      expect(reactionButton).not.toBeDisabled();
    });
  });
}); 