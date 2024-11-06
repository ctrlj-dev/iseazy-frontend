import { FC } from 'react';
import styles from './Loading.module.scss';

const Loading: FC = () => {
  return (
    <div className={styles.spinner}>
      <div className={styles.bubble__1}></div>
      <div className={styles.bubble__2}></div>
    </div>
  );
};

export default Loading;
