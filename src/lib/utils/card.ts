import { CardInterface } from '@lib/interfaces/card.interface';

/**
 * Flips the matching cards based on the selected card's pairId.
 */
const flipMatchingCards = (
  cards: CardInterface[],
  selectedCard: CardInterface
): CardInterface[] => {
  return cards.map(card => {
    if (card.pairId === selectedCard.pairId) {
      card = { ...card, flipped: true };
    }
    return card;
  });
};

/**
 * Checks if all cards are flipped.
 */
const isAllCardsFlipped = (cards: CardInterface[]): boolean => {
  return cards.every(card => card.flipped);
};

/**
 * Resets the flipped state of the cards.
 */
const resetFlippedCards = (
  cards: CardInterface[],
  selectedCards?: CardInterface[]
): CardInterface[] => {
  if (selectedCards) {
    return cards.map(card => {
      if (selectedCards.includes(card)) {
        return { ...card, flipped: false };
      }
      return card;
    });
  }
  return cards.map(card => ({ ...card, flipped: false }));
};

/**
 * Shuffles an array of cards using the Fisher-Yates (Knuth) algorithm.
 */
const shuffleCards = (cards: CardInterface[]): CardInterface[] => {
  const shuffledCards = [...cards];
  for (let i = shuffledCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
  }
  return shuffledCards;
};

export {
  flipMatchingCards,
  isAllCardsFlipped,
  resetFlippedCards,
  shuffleCards,
};
