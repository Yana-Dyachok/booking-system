'use client';

import React, { Suspense, use } from 'react';
import Link from 'next/link';
import { Loader } from '@/shared/ui/loader';
import { EditSVG } from '@/shared/assets/svg/edit.svg';
import { Title } from '@/shared/ui/title';
import { IRegisterResponse } from '@/shared/types';
import { getUserByIdApi } from '@/api/user.api';
import styles from './profile.module.scss';

const fetchData = (async () => {
  try {
    const data = await getUserByIdApi();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
})();

export const PersonalInfo: React.FC = () => {
  const data: IRegisterResponse | null = use(fetchData);

  return (
    <Suspense fallback={<Loader />}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <Title title="Personal information" />
          <Link href="/profile/edit-profile" className={styles.edit}>
            <EditSVG />
          </Link>
        </div>
        <ul>
          <li className={styles.item}>
            <span className={styles.titles}>Full Name:</span>{' '}
            <span>{data?.fullName || 'N/A'}</span>
          </li>
          <li className={styles.item}>
            <span className={styles.titles}>Email:</span>{' '}
            <span>{data?.email || 'N/A'}</span>
          </li>
          <li className={styles.item}>
            <span className={styles.titles}>Phone:</span>{' '}
            <span>{data?.phoneNumber || 'N/A'}</span>
          </li>
          <li className={styles.item}>
            <span className={styles.titles}>Address:</span>{' '}
            <span>{data?.shippingAddress || 'N/A'}</span>
          </li>
          {data?.description && (
            <li className={styles.item}>
              <span className={styles.titles}>Description:</span>{' '}
              <span>{data.description}</span>
            </li>
          )}
        </ul>
      </div>
    </Suspense>
  );
};
