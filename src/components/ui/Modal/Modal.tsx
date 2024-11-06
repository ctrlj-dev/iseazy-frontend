import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import { Button } from '../Button';
import styles from './Modal.module.scss';

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  buttonLabel: string;
  onButtonClick: () => void;
  onClose: () => void;
};

const Modal: FC<ModalProps> = ({
  children,
  isOpen,
  onClose,
  onButtonClick,
  buttonLabel,
}) => {
  const modalRef = React.useRef<HTMLDivElement | null>(null);

  const handleClose = (e: React.MouseEvent) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div
      className={styles.modal}
      ref={modalRef}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
    >
      <div className={styles.content}>
        <div className={styles.children}>{children}</div>
        <Button onClick={onButtonClick}>{buttonLabel}</Button>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
