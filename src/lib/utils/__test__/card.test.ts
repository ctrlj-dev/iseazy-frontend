import { CardInterface } from '@lib/interfaces/card.interface';
import {
  flipMatchingCards,
  isAllCardsFlipped,
  resetFlippedCards,
  shuffleCards,
} from '../card';

const mockCards: CardInterface[] = [
  { id: '1', pairId: '1', image: 'image1.svg', flipped: false },
  { id: '2', pairId: '1', image: 'image2.svg', flipped: true },
  { id: '3', pairId: '2', image: 'image3.svg', flipped: false },
  { id: '4', pairId: '2', image: 'image4.svg', flipped: true },
];

describe('Card Utility Functions', () => {
  describe('flipMatchingCards', () => {
    it('flips matching cards based on the selected card', () => {
      const selectedCard: CardInterface = {
        id: '1',
        pairId: '1',
        image: 'image1.svg',
        flipped: false,
      };
      const result = flipMatchingCards(mockCards, selectedCard);

      expect(result[0].flipped).toBe(true);
      expect(result[1].flipped).toBe(true);
      expect(result[2].flipped).toBe(false);
    });

    it('does not flip cards if no matching pairId is found', () => {
      const selectedCard: CardInterface = {
        id: '3',
        pairId: '3',
        image: 'image3.svg',
        flipped: false,
      };
      const result = flipMatchingCards(mockCards, selectedCard);

      expect(result[0].flipped).toBe(false);
      expect(result[1].flipped).toBe(true);
      expect(result[2].flipped).toBe(false);
    });
  });

  describe('isAllCardsFlipped', () => {
    it('returns true if all cards are flipped', () => {
      const flippedCards: CardInterface[] = mockCards.map(card => ({
        ...card,
        flipped: true,
      }));
      expect(isAllCardsFlipped(flippedCards)).toBe(true);
    });

    it('returns false if any card is not flipped', () => {
      expect(isAllCardsFlipped(mockCards)).toBe(false);
    });
  });

  describe('resetFlippedCards', () => {
    it('resets all cards to not flipped', () => {
      const result = resetFlippedCards(mockCards);
      expect(result.every(card => !card.flipped)).toBe(true);
    });

    it('only resets selected cards', () => {
      const selectedCards = [mockCards[0], mockCards[2]];
      const result = resetFlippedCards(mockCards, selectedCards);

      expect(result[0].flipped).toBe(false);
      expect(result[1].flipped).toBe(true);
      expect(result[2].flipped).toBe(false);
      expect(result[3].flipped).toBe(true);
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
});
