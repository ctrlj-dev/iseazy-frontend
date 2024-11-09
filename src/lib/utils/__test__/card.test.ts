import { CardInterface } from '@lib/interfaces/card.interface';
import {
  disableCardFlip,
  flipMatchingCards,
  Game,
  getSelectedPairIds,
  isAllCardsFlipped,
  isCardFlipped,
  resetFlippedCards,
  resetSelectedCards,
  SelectedCards,
  shuffleCards,
} from '../card';

describe('Card Utility Functions', () => {
  const mockCards: CardInterface[] = [
    { id: '1', pairId: 'A', image: 'image1.jpg', flipped: false },
    { id: '2', pairId: 'A', image: 'image2.jpg', flipped: false },
    { id: '3', pairId: 'B', image: 'image3.jpg', flipped: true },
    { id: '4', pairId: 'B', image: 'image4.jpg', flipped: false },
  ];

  test('isCardFlipped should return true for flipped cards', () => {
    expect(isCardFlipped(mockCards, '3')).toBe(true);
    expect(isCardFlipped(mockCards, '1')).toBe(false);
  });

  test('should return true if the game state is FINISHED', () => {
    expect(disableCardFlip('1', Game.FINISHED, [], mockCards)).toBe(true);
  });

  test('should return true if the game state is MATCHING', () => {
    expect(disableCardFlip('1', Game.MATCHING, [], mockCards)).toBe(true);
  });

  test('should return true if the card is already flipped', () => {
    expect(disableCardFlip('3', Game.PLAYING, [], mockCards)).toBe(true);
  });

  test('should return true if the card is already selected', () => {
    const selectedCards: SelectedCards = ['1'];
    expect(disableCardFlip('1', Game.PLAYING, selectedCards, mockCards)).toBe(
      true
    );
  });

  test('should return false if the card is not flipped, not selected, and game state is PLAYING', () => {
    const selectedCards: SelectedCards = ['1'];
    expect(disableCardFlip('2', Game.PLAYING, selectedCards, mockCards)).toBe(
      false
    );
  });

  test('getSelectedPairIds should return pairIds for selected cards', () => {
    expect(getSelectedPairIds(mockCards, ['1', '2'])).toEqual(['A', 'A']);
    expect(getSelectedPairIds(mockCards, ['3', '4'])).toEqual(['B', 'B']);
  });

  test('flipMatchingCards should flip cards with the matching pairId', () => {
    const updatedCards = flipMatchingCards(mockCards, 'A');
    expect(updatedCards[0].flipped).toBe(true);
    expect(updatedCards[1].flipped).toBe(true);
    expect(updatedCards[2].flipped).toBe(true);
  });

  test('isAllCardsFlipped should return true if all cards are flipped', () => {
    const allFlippedCards: CardInterface[] = [
      { id: '1', pairId: 'A', image: 'image1.jpg', flipped: true },
      { id: '2', pairId: 'A', image: 'image2.jpg', flipped: true },
      { id: '3', pairId: 'B', image: 'image3.jpg', flipped: true },
      { id: '4', pairId: 'B', image: 'image4.jpg', flipped: true },
    ];
    const partiallyFlippedCards = mockCards;

    expect(isAllCardsFlipped(allFlippedCards)).toBe(true);
    expect(isAllCardsFlipped(partiallyFlippedCards)).toBe(false);
  });

  test('resetSelectedCards should reset the flipped state of selected cards', () => {
    const selectedCards: SelectedCards = ['1', '2'];
    const updatedCards = resetSelectedCards(mockCards, selectedCards);

    expect(updatedCards[0].flipped).toBe(false);
    expect(updatedCards[1].flipped).toBe(false);
    expect(updatedCards[2].flipped).toBe(true);
  });

  test('resetFlippedCards should reset the flipped state for all cards', () => {
    const updatedCards = resetFlippedCards(mockCards);
    updatedCards.forEach(card => {
      expect(card.flipped).toBe(false);
    });
  });

  test('shuffleCards should shuffle the cards array', () => {
    const shuffledCards = shuffleCards(mockCards);
    expect(shuffledCards).not.toEqual(mockCards);
    expect(shuffledCards.length).toBe(mockCards.length);
  });
});
