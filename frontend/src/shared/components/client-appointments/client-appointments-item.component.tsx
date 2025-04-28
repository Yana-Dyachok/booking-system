'use client';

import React from 'react';
import { IAppointmentResponse } from '@/shared/types';
import { DeleteAppointmentButton } from '../delete-appointment-button/delete-appointment-button.component';
import { EditSVG } from '@/shared/assets/svg/edit.svg';
import { formatDate, formatTime } from '@/utils';
import Link from 'next/link';
import styles from './client-appointment.module.scss';

interface ClientAppointmentsProps {
  data: IAppointmentResponse;
}

export const ClientAppointmentsItem: React.FC<ClientAppointmentsProps> = ({
  data,
}) => {
  return (
    <div className={styles.blockItem}>
      <ul>
        <li className={styles.item}>
          <span className={styles.titles}>Business name:</span>
          <span>{data.business.fullName || 'N/A'}</span>
        </li>
        <li className={styles.item}>
          <span className={styles.titles}>Date:</span>
          <span>{data.date ? formatDate(data.date) : 'N/A'}</span>
        </li>
        <li className={styles.item}>
          <span className={styles.titles}>Time:</span>
          <span>{data.date ? formatTime(data.date) : 'N/A'}</span>
        </li>
        <li className={styles.item}>
          <span className={styles.titles}>Duration:</span>
          <span>{data.durationMin || 'N/A'} min</span>
        </li>
      </ul>
      <div className={styles.buttons}>
        <Link href="/" className={styles.edit}>
          <EditSVG />
        </Link>
        <DeleteAppointmentButton id={data.id} />
      </div>
    </div>
  );
};
