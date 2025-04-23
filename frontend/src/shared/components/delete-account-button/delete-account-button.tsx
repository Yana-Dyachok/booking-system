'use client';

import React, { useState } from 'react';
import { deleteUserApi } from '@/api/user.api';
import { ConfirmationModal } from '@/shared/ui/confirmation-modal/confirmation-modal.component';
import styles from './delete-account-button.module.scss';

export const DeleteAccountButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteAccountConfirm = async () => {
    try {
      await deleteUserApi();
    } catch (error) {
      console.error('Error deleting account', error);
    } finally {
      closeModal();
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className={styles.deleteAccount}
      >
        Delete Account
      </button>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleDeleteAccountConfirm}
        message="Are you sure you want to delete your account?"
      />
    </>
  );
};
