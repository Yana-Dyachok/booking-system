'use client';

import React, { Suspense, use } from 'react';
import { Loader } from '@/shared/ui/loader';
import { Title } from '@/shared/ui/title';
import { IBusinessUsersResponse, IBusinessUserPreview } from '@/shared/types';
import { getUsersByRoleApi } from '@/api/user.api';
import { BusinessItem } from './business-item';
import styles from '../profile/profile.module.scss';

const fetchData = (async () => {
  try {
    const data = await getUsersByRoleApi();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
})();

export const BusinessComponents: React.FC = () => {
  const data: IBusinessUsersResponse | null = use(fetchData);
  const dataUsers: IBusinessUserPreview[] = data?.items || [];

  return (
    <Suspense fallback={<Loader />}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <Title title="Business users" />
        </div>
        {dataUsers.map((item, index) => (
          <BusinessItem data={item} key={index + item.id} />
        ))}
      </div>
    </Suspense>
  );
};
