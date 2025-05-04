'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ClientAppointmentsProps } from '@/shared/types';
import { DeleteAppointmentButton } from '../delete-appointment-button/delete-appointment-button.component';
import { EditSVG } from '@/shared/assets/svg/edit.svg';
import { formatDate, formatTime } from '@/utils';
import styles from '../business/business.module.scss';

export const ClientAppointmentsItem: React.FC<ClientAppointmentsProps> = ({
  data,
  setData,
  page,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage: string = searchParams.get('page') || '1';
  const appointmentDate: Date | null = data.date ? new Date(data.date) : null;
  const now: Date | null = new Date();
  const isPast: boolean | null = appointmentDate && appointmentDate < now;
  const dateClassName: string = isPast ? styles.pastDate : '';

  const onClickEditButton = (): void => {
    router.push(`/appointments/${data.id}?page=${currentPage}`);
  };

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
        <button
          type="button"
          onClick={onClickEditButton}
          className={styles.edit}
        >
          <EditSVG />
        </button>
        <DeleteAppointmentButton id={data.id} setData={setData} page={page} />
      </div>
    </div>
  );
};
