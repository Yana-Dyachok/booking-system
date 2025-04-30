'use client';

import React from 'react';
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
  const { data, isLoading, page, setPage } = usePaginatedFetch<
    IBusinessUserPreview,
    IBusinessUsersResponse
  >({
    fetchFunction: getUsersByRoleApi,
  });

  const dataUsers = data?.items || [];
  const totalItems = data?.total || 0;

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
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
                {dataUsers.map((item, index) => (
                  <BusinessItem data={item} key={index + item.id} />
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
