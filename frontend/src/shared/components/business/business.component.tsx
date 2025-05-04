'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Pagination from '@mui/material/Pagination';
import { Loader } from '@/shared/ui/loader';
import { Title } from '@/shared/ui/title';
import { IBusinessUserPreview, IBusinessUsersResponse } from '@/shared/types';
import { getUsersByRoleApi } from '@/api/user.api';
import { BusinessItem } from './business-item';
import { Wrapper } from '@/shared/ui/wrapper';
import { usePaginatedFetch } from '@/shared/hook';
import styles from './business.module.scss';

export const BusinessComponents: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageFromQuery: number = Number(searchParams.get('page')) || 1;

  const { data, isLoading, page, setPage } = usePaginatedFetch<
    IBusinessUserPreview,
    IBusinessUsersResponse
  >({
    fetchFunction: getUsersByRoleApi,
    initialPage: pageFromQuery,
  });

  const dataUsers: IBusinessUserPreview[] = data?.items || [];
  const totalItems: number = data?.total || 0;

  const handleChange = (
    _event: React.ChangeEvent<unknown>,
    value: number,
  ): void => {
    setPage(value);
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', value.toString());
    router.replace(`?${params.toString()}`);
  };

  return (
    <Wrapper>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.wrapper}>
          <Title title="Business users" />
          {+totalItems > 0 ? (
            <div className={styles.blockInner}>
              <div className={styles.usersBlock}>
                {dataUsers.map((item) => (
                  <BusinessItem data={item} key={item.id} />
                ))}
              </div>
              <Pagination
                className={styles.pagination}
                count={Math.ceil(+totalItems / 5)}
                page={page}
                onChange={handleChange}
              />
            </div>
          ) : (
            <h2 className={styles.titles}>There are no users</h2>
          )}
        </div>
      )}
    </Wrapper>
  );
};
