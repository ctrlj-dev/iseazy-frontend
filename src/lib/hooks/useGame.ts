import { CardInterface } from '@lib/interfaces/card.interface';
import {
  flipMatchingCards,
  isAllCardsFlipped,
  resetFlippedCards,
  shuffleCards,
} from '@lib/utils/card';
import { useReducer, useRef } from 'react';

export type GameState = {
  cards: CardInterface[];
  selectedCards: CardInterface[];
  isGameOver: boolean;
  startTime: number;
  endTime: number;
};

const InitialState: GameState = {
  cards: [],
  selectedCards: [],
  isGameOver: false,
  startTime: 0,
  endTime: 0,
};

type Action =
  | { type: 'FLIP_CARD'; payload: CardInterface }
  | { type: 'RESET_FLIPPED' }
  | { type: 'START_GAME' }
  | { type: 'END_GAME' }
  | { type: 'RESET_GAME' };

const gameReducer = (state: GameState, action: Action): GameState => {
  switch (action.type) {
    case 'FLIP_CARD': {
      const updatedSelectedCards = [...state.selectedCards, action.payload];

      if (updatedSelectedCards.length < 2) {
        return {
          ...state,
          selectedCards: updatedSelectedCards,
        };
      }

      const [firstCard, secondCard] = updatedSelectedCards;
      const isPairMatch = firstCard.pairId === secondCard.pairId;

      if (!isPairMatch) {
        return {
          ...state,
          selectedCards: updatedSelectedCards,
        };
      }
      const updatedCards = flipMatchingCards(state.cards, firstCard);
      const isGameOver = isAllCardsFlipped(updatedCards);

      return {
        ...state,
        selectedCards: [],
        cards: updatedCards,
        ...(isGameOver && { isGameOver, endTime: Date.now() }),
      };
    }

    case 'RESET_FLIPPED':
      return {
        ...state,
        selectedCards: [],
        cards: resetFlippedCards(state.cards, state.selectedCards),
      };

    case 'START_GAME':
      return {
        ...state,
        startTime: Date.now(),
      };

    case 'RESET_GAME': {
      const initialCards = resetFlippedCards(state.cards);
      return {
        ...InitialState,
        cards: shuffleCards(initialCards),
        startTime: 0,
        endTime: 0,
        isGameOver: false,
      };
    }

    case 'END_GAME':
      return {
        ...state,
        startTime: 0,
      };

    default:
      return state;
  }
};

const useGame = (initialCards: CardInterface[]) => {
  const [state, dispatch] = useReducer(gameReducer, {
    ...InitialState,
    cards: shuffleCards(initialCards),
  });

  const isFlippingRef = useRef(false);

  const handleFlipCard = (card: CardInterface) => {
    // Prevent flipping if the card is already flipped
    if (state.selectedCards.includes(card) || isFlippingRef.current) {
      return;
    }

    if (state.startTime === 0) {
      dispatch({ type: 'START_GAME' });
    }

    dispatch({ type: 'FLIP_CARD', payload: card });

    if (state.selectedCards.length === 1) {
      const firstSelectedCard = state.selectedCards[0];
      const isCardMatched = firstSelectedCard.pairId === card.pairId;

      if (!isCardMatched) {
        isFlippingRef.current = true;
      }

      setTimeout(() => {
        if (!isCardMatched) {
          dispatch({ type: 'RESET_FLIPPED' });
        }
        isFlippingRef.current = false;

        if (state.isGameOver) {
          dispatch({ type: 'END_GAME' });
        }
      }, 800);
    }
  };

  const handleResetGame = () => {
    dispatch({ type: 'RESET_GAME' });
  };

  return {
    state,
    handleFlipCard,
    handleResetGame,
  };
};

export { useGame };
