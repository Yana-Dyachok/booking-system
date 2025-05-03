'use client';

import React from 'react';
import { ClientAppointmentsProps } from '@/shared/types';
import { DeleteAppointmentButton } from '../delete-appointment-button/delete-appointment-button.component';
import { EditSVG } from '@/shared/assets/svg/edit.svg';
import { formatDate, formatTime } from '@/utils';
import Link from 'next/link';
import styles from '../business/business.module.scss';

export const ClientAppointmentsItem: React.FC<ClientAppointmentsProps> = ({
  data,
  setData,
  page,
}) => {
  const appointmentDate = data.date ? new Date(data.date) : null;
  const now = new Date();
  const isPast = appointmentDate && appointmentDate < now;
  const dateClassName = isPast ? styles.pastDate : '';

  return (
    <div className={styles.blockItem}>
      <ul>
        <li className={styles.item}>
          <span className={styles.titles}>Business name:</span>
          <span>{data.business.fullName || 'N/A'}</span>
        </li>
        <li className={styles.item}>
          <span className={styles.titles}>Date:</span>
          <span className={dateClassName}>
            {data.date ? formatDate(data.date) : 'N/A'}
          </span>
        </li>
        <li className={styles.item}>
          <span className={styles.titles}>Time:</span>
          <span className={dateClassName}>
            {data.date ? formatTime(data.date) : 'N/A'}
          </span>
        </li>
        <li className={styles.item}>
          <span className={styles.titles}>Duration:</span>
          <span>{data.durationMin || 'N/A'} min</span>
        </li>
      </ul>

      <div className={styles.buttons}>
        <Link href={`/appointments/${data.id}`} className={styles.edit}>
          <EditSVG />
        </Link>
        <DeleteAppointmentButton id={data.id} setData={setData} page={page} />
      </div>
    </div>
  );
};
