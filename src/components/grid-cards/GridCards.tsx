import { Card } from '@components/ui/Card';
import { Modal } from '@components/ui/Modal';
import { Typography } from '@components/ui/Typography';
import TEXT_CONSTANTS from '@lib/constants/text';
import { useGame } from '@lib/hooks/useGame';
import { Game } from '@lib/utils/card';
import { formatTime } from '@lib/utils/time';
import mockCards from '@public/mocks/cards';
import { FC, memo } from 'react';
import styles from './GridCards.module.scss';

const MemoizedCard = memo(Card, (prevProps, nextProps) => {
  return prevProps.card.flipped === nextProps.card.flipped;
});

const MemoizedModal = memo(Modal, (prevProps, nextProps) => {
  return prevProps.isOpen === nextProps.isOpen;
});

const GridCards: FC = () => {
  const { state, handleFlipCard, handleResetGame } = useGame(mockCards);

  const closeModal = () => {
    handleResetGame();
  };

  return (
    <div className={styles.container}>
      {state.cards.map((card, index) => {
        const isFlipped =
          state.selectedCards.some(selectedCard => selectedCard === card.id) ||
          card.flipped;
        const card_ = isFlipped ? { ...card, flipped: true } : card;
        return (
          <MemoizedCard
            index={index}
            key={card.id}
            card={card_}
            onClick={() => handleFlipCard(card.id)}
          />
        );
      })}
      <MemoizedModal
        buttonLabel={TEXT_CONSTANTS.BUTTONS.RESET}
        isOpen={state.game === Game.FINISHED}
        onClose={closeModal}
      >
        <Typography tag="p">{TEXT_CONSTANTS.GAME.COMPLETED}</Typography>
        <div className={styles.timer}>
          <div className={styles.clock}></div>
          <Typography tag="h2">
            {formatTime(state.startTime, state.endTime)}
          </Typography>
        </div>
      </MemoizedModal>
    </div>
  );
};

export default GridCards;
