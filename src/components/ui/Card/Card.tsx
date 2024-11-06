import { CardInterface } from '@lib/interfaces/card.interface';
import { FC } from 'react';
import { Typography } from '../Typography';
import styles from './Card.module.scss';

type CardProps = {
  card: CardInterface;
  index: number;
  onClick: () => void;
};

const Card: FC<CardProps> = ({ card, onClick, index }) => {
  const classNames = `${styles.card} ${card.flipped ? styles.flipped : ''}`;
  return (
    <div data-testid={'card'} className={classNames} onClick={onClick}>
      <div className={styles.inner}>
        <div
          className={styles.front}
          //FIXME: This should be on scss file, but need a workaround on webpack config
          style={{ backgroundImage: 'url(./svg/reverse-pattern.svg)' }}
        >
          <Typography tag="span" variant="h4" className={styles.number}>
            {index + 1}
          </Typography>
        </div>
        <div className={styles.back}>
          <img src={`${card.image}`} alt="Back" />
        </div>
      </div>
    </div>
  );
};

export default Card;
