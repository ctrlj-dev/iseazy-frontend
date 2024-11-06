import { CardInterface } from '@lib/interfaces/card.interface';
import { fireEvent, render, screen } from '@testing-library/react';
import Card from './Card';

const mockCard: CardInterface = {
  id: '1',
  pairId: '1',
  image: 'path/to/image.svg',
  flipped: false,
};

const index = 0;

const mockOnClick = jest.fn();

describe('Card Component', () => {
  beforeEach(() => {
    render(<Card card={mockCard} index={index} onClick={mockOnClick} />);
  });

  it('renders the card with the correct index', () => {
    const numberElement = screen.getByText(/1/i);
    expect(numberElement).toBeInTheDocument();
  });

  it('renders the back of the card with the image', () => {
    const backImage = screen.getByAltText('Back');
    expect(backImage).toBeInTheDocument();
    expect(backImage).toHaveAttribute('src', mockCard.image);
  });

  it('calls onClick when the card is clicked', () => {
    const cardElement = screen.getByTestId('card');
    fireEvent.click(cardElement);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});

describe('When card is flipped', () => {
  it('applies the flipped class when card.isFlipped is true', () => {
    const flippedCard = { ...mockCard, flipped: true };
    render(<Card card={flippedCard} index={index} onClick={mockOnClick} />);

    const cardElement = screen.getByTestId('card');
    expect(cardElement).toHaveClass('flipped');
  });
});
