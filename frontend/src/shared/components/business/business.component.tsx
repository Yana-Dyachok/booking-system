'use client';

import React, { Suspense, use } from 'react';
import { Loader } from '@/shared/ui/loader';
import { Title } from '@/shared/ui/title';
import { IBusinessUsersResponse, IBusinessUserPreview } from '@/shared/types';
import { getUsersByRoleApi } from '@/api/user.api';
import { BusinessItem } from './business-item';
import { Wrapper } from '@/shared/ui/wrapper';
import styles from './business.module.scss';

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
    <Wrapper>
      <Suspense fallback={<Loader />}>
        <div className={styles.wrapper}>
          <Title title="Business users" />
          {dataUsers.map((item, index) => (
            <BusinessItem data={item} key={index + item.id} />
          ))}
        </div>
      </Suspense>
    </Wrapper>
  );
};
