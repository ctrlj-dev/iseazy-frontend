import { CardInterface } from '@lib/interfaces/card.interface';
import {
  CardId,
  disableCardFlip,
  flipMatchingCards,
  Game,
  GameState,
  getSelectedPairIds,
  isAllCardsFlipped,
  resetFlippedCards,
  resetSelectedCards,
  SelectedCards,
  shuffleCards,
} from '@lib/utils/card';
import { useEffect, useReducer } from 'react';

type Action =
  | { type: 'FLIP_CARD'; cardId: CardId }
  | { type: 'MATCHING' }
  | { type: 'RESET_GAME' };

const InitialState: GameState = {
  cards: [],
  selectedCards: [],
  game: Game.PLAYING,
  startTime: Date.now(),
  endTime: 0,
};

const gameReducer = (state: GameState, action: Action): GameState => {
  switch (action.type) {
    case 'FLIP_CARD': {
      const { game, selectedCards, cards } = state;
      // Prevent flip cards if already flipped,selected or matching
      const isCardFlipDisabled = disableCardFlip(
        action.cardId,
        game,
        selectedCards,
        cards
      );
      if (isCardFlipDisabled) {
        return state;
      }
      const updatedSelectedCards: SelectedCards = [
        ...state.selectedCards,
        action.cardId,
      ] as SelectedCards;

      let gameState = game;
      if (updatedSelectedCards.length === 2) {
        gameState = Game.MATCHING;
      } 

      return {
        ...state,
        selectedCards: updatedSelectedCards,
        game: gameState,
      };
    }

    case 'MATCHING': {
      const { selectedCards, cards } = state;
      const [firstPairId, secondPairId] = getSelectedPairIds(
        cards,
        selectedCards
      );

      if (!firstPairId || !secondPairId) {
        return state;
      }

      const isMatch = firstPairId === secondPairId;

      let updatedCards = cards;
      if (!isMatch) {
        updatedCards = resetSelectedCards(cards, selectedCards);
      } else {
        updatedCards = flipMatchingCards(cards, firstPairId);
      }

      const isGameOver = isMatch && isAllCardsFlipped(updatedCards);

      let gameState;
      let endTime = 0;
      if (isGameOver) {
        gameState = Game.FINISHED;
        endTime = Date.now();
      } else {
        gameState = Game.PLAYING;
      }

      return {
        ...state,
        selectedCards: [],
        cards: updatedCards,
        game: gameState,
        endTime,
      };
    }

    case 'RESET_GAME': {
      const initialCards = resetFlippedCards(state.cards);
      return {
        ...InitialState,
        game: Game.PLAYING,
        startTime: Date.now(),
        cards: shuffleCards(initialCards),
      };
    }

    default:
      return state;
  }
};

const useGame = (initialCards: CardInterface[]) => {
  const [state, dispatch] = useReducer(gameReducer, {
    ...InitialState,
    cards: shuffleCards(initialCards),
  });

  const handleFlipCard = (cardId: CardId) => {
    dispatch({ type: 'FLIP_CARD', cardId });
  };

  useEffect(() => {
    if (state.game === Game.MATCHING) {
      const matchingTimeout = setTimeout(() => {
        dispatch({ type: 'MATCHING' });
      }, 600);
      return () => clearTimeout(matchingTimeout);
    }
  }, [state.game]);

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
