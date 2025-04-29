'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Loader } from '@/shared/ui/loader';
import { EditSVG } from '@/shared/assets/svg/edit.svg';
import { Title } from '@/shared/ui/title';
import { IRegisterResponse, Role } from '@/shared/types';
import { getUserByIdApi } from '@/api/user.api';
import { useAuthStore } from '@/shared/store';
import styles from './profile.module.scss';

export const PersonalInfo: React.FC = () => {
  const [data, setData] = useState<IRegisterResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const role = useAuthStore((state) => state.role);

  useEffect(() => {
    getUserByIdApi()
      .then((res) => setData(res))
      .catch((err) => {
        console.error('Error fetching user:', err);
        setData(null);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <div>
      <div className={styles.header}>
        <Title title="Personal information" />
        <Link href="/profile/edit-profile" className={styles.edit}>
          <EditSVG />
        </Link>
      </div>
      <ul>
        <li className={styles.item}>
          <span className={styles.titles}>
            {role === Role.CLIENT ? 'Full name' : 'Business name'}:
          </span>
          <span>{data?.fullName || 'N/A'}</span>
        </li>
        <li className={styles.item}>
          <span className={styles.titles}>Email:</span>
          <span>{data?.email || 'N/A'}</span>
        </li>
        <li className={styles.item}>
          <span className={styles.titles}>Phone:</span>
          <span>{data?.phoneNumber || 'N/A'}</span>
        </li>
        <li className={styles.item}>
          <span className={styles.titles}>Address:</span>
          <span>{data?.shippingAddress || 'N/A'}</span>
        </li>
        {data?.description && (
          <li className={styles.item}>
            <span className={styles.titles}>Description:</span>
            <span>{data.description}</span>
          </li>
        )}
      </ul>
    </div>
  );
};
