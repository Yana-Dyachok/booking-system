'use client';

import React, { useState } from 'react';
import {
  deleteAppointmentApi,
  getClientAppointmentsApi,
} from '@/api/appointment.api';
import { ConfirmationModal } from '@/shared/ui/confirmation-modal/confirmation-modal.component';
import { DeleteSVG } from '@/shared/assets/svg/delete.svg';
import { AppointmentDataProps } from '@/shared/types';
import { toast } from 'react-toastify';
import styles from './delete-appointment-button.module.scss';

export const DeleteAppointmentButton: React.FC<AppointmentDataProps> = ({
  id,
  setData,
  page,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (): void => {
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
  };

  const handleDeleteConfirm = async (): Promise<void> => {
    try {
      await deleteAppointmentApi(id);
      toast.success('Appointment deleted');
      const updatedData = await getClientAppointmentsApi({ page, limit: 5 });
      setData(updatedData);
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
