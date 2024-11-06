import { Button } from '@components/ui/Button';
import { Typography } from '@components/ui/Typography';
import ROUTES from '@lib/constants/routes';
import TEXT_CONSTANTS from '@lib/constants/text';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Start.module.scss';

const Start: FC = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate(ROUTES.GAME);
  };

  return (
    <div className={styles.container}>
      <div className={styles.brand__container}>
        <div className={styles.logo}>
          <img src="img/light-bulb.png" alt="Light Bulb" />
        </div>
        <Typography tag="h1"> {TEXT_CONSTANTS.HOME.TITLE}</Typography>
        <Button onClick={handleStartClick}>
          {TEXT_CONSTANTS.BUTTONS.START}
        </Button>
      </div>
    </div>
  );
};

export default Start;
