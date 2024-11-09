import { CardInterface } from '@lib/interfaces/card.interface';

export type CardId = CardInterface['id'];
export type SelectedCards = [CardId, CardId?] | [];

export enum Game {
  PLAYING = 'PLAYING',
  MATCHING = 'MATCHING',
  FINISHED = 'FINISHED',
}

export type GameState = {
  cards: CardInterface[];
  selectedCards: SelectedCards;
  game: Game;
  startTime: number;
  endTime: number;
};

/**
 * Check if card have been flipped
 */
const isCardFlipped = (cards: CardInterface[], cardId: CardId): boolean => {
  return !!cards.find(card => card.id === cardId)?.flipped;
};

/**
 * Disable card flip under specific conditions
 */
const disableCardFlip = (
  cardId: CardId,
  game: Game,
  selectedCards: SelectedCards,
  cards: CardInterface[]
): boolean => {
  let prevent = false;

  // Prevent flip on specifics states
  if (game === Game.FINISHED || game === Game.MATCHING) {
    prevent = true;
  }

  const isSelectedCard =
    selectedCards.length !== 0 && selectedCards.includes(cardId);
  // Prevent flip when card its selected or flipped
  if (isSelectedCard || isCardFlipped(cards, cardId)) {
    prevent = true;
  }

  return prevent;
};

/**
 * Get pairIds for selecteds cards
 */
const getSelectedPairIds = (
  cards: CardInterface[],
  selectedCards: SelectedCards
): (string | undefined)[] => {
  return selectedCards.map(cardId => {
    const card = cards.find(card => card.id === cardId);
    if (!card) {
      return;
    }
    return card.pairId;
  });
};

/**
 * Flips the matching cards based on the selected card's pairId.
 */
const flipMatchingCards = (
  cards: CardInterface[],
  selectedId: CardId
): CardInterface[] => {
  return cards.map(card => {
    if (card.pairId === selectedId) {
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
 * Reset flipped state for selected cards
 */
const resetSelectedCards = (
  cards: CardInterface[],
  selectedCards: SelectedCards
): CardInterface[] => {
  if (selectedCards.length === 0) {
    return cards;
  }
  cards.map(card => {
    if (selectedCards.includes(card.id)) {
      return { ...card, flipped: false };
    }
    return card;
  });
  return cards;
};

/**
 * Resets all cards flipped state
 */
const resetFlippedCards = (cards: CardInterface[]): CardInterface[] =>
  cards.map(card => ({ ...card, flipped: false }));

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
  disableCardFlip,
  flipMatchingCards,
  getSelectedPairIds,
  isAllCardsFlipped,
  isCardFlipped,
  resetFlippedCards,
  resetSelectedCards,
  shuffleCards,
};
