import { CardInterface } from '@lib/interfaces/card.interface';
import {
  flipMatchingCards,
  getSelectedPairIds,
  isAllCardsFlipped,
  resetFlippedCards,
  resetSelectedCards,
  SelectedCards,
  shuffleCards,
} from '../card';

describe('Card Game Utilities', () => {
  const mockCards: CardInterface[] = [
    { id: '1', pairId: 'a', image: 'image1.png', flipped: false },
    { id: '2', pairId: 'b', image: 'image2.png', flipped: false },
    { id: '3', pairId: 'a', image: 'image3.png', flipped: false },
    { id: '4', pairId: 'c', image: 'image4.png', flipped: false },
  ];

  const isCardFlipped = (cards: CardInterface[], cardId: string): boolean => {
    return !!cards.find(card => card.id === cardId)?.flipped;
  };

  const disableCardFlip = (
    cardId: string,
    game: string,
    selectedCards: SelectedCards,
    cards: CardInterface[]
  ): boolean => {
    let prevent = false;

    if (game === 'FINISHED' || game === 'FLIPPING_SECOND_CARD') {
      prevent = true;
    }

    const isSelectedCard =
      selectedCards.length !== 0 && selectedCards.includes(cardId);
    if (isSelectedCard || isCardFlipped(cards, cardId)) {
      prevent = true;
    }

    return prevent;
  };

  describe('getSelectedPairIds', () => {
    it('should return the pairId for selected cards', () => {
      const selectedCards: SelectedCards = ['1', '3'];
      const result = getSelectedPairIds(mockCards, selectedCards);
      expect(result).toEqual(['a', 'a']);
    });

    it('should return undefined if the card does not exist', () => {
      const selectedCards: SelectedCards = ['1', '999'];
      const result = getSelectedPairIds(mockCards, selectedCards);
      expect(result).toEqual(['a', undefined]);
    });
  });

  describe('flipMatchingCards', () => {
    it('should flip cards that match the selected pairId', () => {
      const selectedId = 'a';
      const result = flipMatchingCards(mockCards, selectedId);
      expect(result[0].flipped).toBe(true);
      expect(result[1].flipped).toBe(false);
      expect(result[2].flipped).toBe(true);
      expect(result[3].flipped).toBe(false);
    });
  });

  describe('isAllCardsFlipped', () => {
    it('should return true if all cards are flipped', () => {
      const cards = mockCards.map(card => ({ ...card, flipped: true }));
      const result = isAllCardsFlipped(cards);
      expect(result).toBe(true);
    });

    it('should return false if not all cards are flipped', () => {
      const result = isAllCardsFlipped(mockCards);
      expect(result).toBe(false);
    });
  });

  describe('resetSelectedCards', () => {
    it('should reset flipped state for selected cards', () => {
      const selectedCards: SelectedCards = ['1', '3'];
      const result = resetSelectedCards(mockCards, selectedCards);
      expect(result[0].flipped).toBe(false);
      expect(result[2].flipped).toBe(false);
    });

    it('should return cards unchanged if no selected cards', () => {
      const result = resetSelectedCards(mockCards, []);
      expect(result).toEqual(mockCards);
    });
  });

  describe('resetFlippedCards', () => {
    it('should reset flipped state for all cards', () => {
      const cardsWithFlippedState = mockCards.map(card => ({
        ...card,
        flipped: true,
      }));
      const result = resetFlippedCards(cardsWithFlippedState);
      result.forEach(card => expect(card.flipped).toBe(false));
    });
  });

  describe('shuffleCards', () => {
    it('should shuffle the cards and return a new array with the same elements', () => {
      const shuffledCards = shuffleCards(mockCards);
      expect(shuffledCards).toHaveLength(mockCards.length);
    });

    it('should contain the same elements as the original array', () => {
      const shuffledCards = shuffleCards(mockCards);
      expect(shuffledCards).toEqual(expect.arrayContaining(mockCards));
    });

    it('should not have the same order as the original array', () => {
      const shuffledCards = shuffleCards(mockCards);
      expect(shuffledCards).not.toEqual(mockCards);
    });
  });

  describe('disableCardFlip', () => {
    it('should prevent card flip when the game is finished', () => {
      const result = disableCardFlip('1', 'FINISHED', [], mockCards);
      expect(result).toBe(true);
    });

    it('should prevent card flip when the game is flipping the second card', () => {
      const result = disableCardFlip(
        '1',
        'FLIPPING_SECOND_CARD',
        [],
        mockCards
      );
      expect(result).toBe(true);
    });

    it('should prevent flip when the card is already selected', () => {
      const selectedCards: SelectedCards = ['1'];
      const result = disableCardFlip('1', 'ONGOING', selectedCards, mockCards);
      expect(result).toBe(true);
    });

    it('should prevent flip when the card is already flipped', () => {
      mockCards[0].flipped = true;
      const result = disableCardFlip('1', 'ONGOING', [], mockCards);
      expect(result).toBe(true);
    });

    it('should allow flip if none of the conditions prevent it', () => {
      const result = disableCardFlip('2', 'ONGOING', [], mockCards);
      expect(result).toBe(false);
    });
  });
});
