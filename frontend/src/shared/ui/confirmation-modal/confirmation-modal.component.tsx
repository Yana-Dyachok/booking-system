'use client';

import React from 'react';
import { Button } from '../button';
import styles from './confirmation-modal.module.scss';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  message,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <p className={styles.text}>{message}</p>
        <div className={styles.buttons}>
          <Button btnType="button" onClick={onConfirm} color="dark">
            Yes
          </Button>
          <Button btnType="button" onClick={onClose} color="light">
            No
          </Button>
        </div>
      </div>
    </div>
  );
};
