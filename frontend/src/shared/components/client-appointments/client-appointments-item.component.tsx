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
        <Link href={`/appointments/${data.id}`} className={styles.edit}>
          <EditSVG />
        </Link>
        <DeleteAppointmentButton id={data.id} setData={setData} page={page} />
      </div>
    </div>
  );
};
