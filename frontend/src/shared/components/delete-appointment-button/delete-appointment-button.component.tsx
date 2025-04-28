'use client';

import React, { useState } from 'react';
import { deleteAppointmentApi } from '@/api/appointment.api';
import { ConfirmationModal } from '@/shared/ui/confirmation-modal/confirmation-modal.component';
import { DeleteSVG } from '@/shared/assets/svg/delete.svg';
import { toast } from 'react-toastify';
import styles from './delete-appointment-button.module.scss';

export const DeleteAppointmentButton: React.FC<{ id: string }> = ({ id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteAppointmentApi(id);
      toast.success('Appointment deleted');
    } catch (error) {
      toast.error(`${error}`);
    } finally {
      closeModal();
    }
  };

  return (
    <>
      <button type="button" onClick={openModal} className={styles.delete}>
        <DeleteSVG />
      </button>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleDeleteConfirm}
        message="Are you sure you want to delete your appointment?"
      />
    </>
  );
};
