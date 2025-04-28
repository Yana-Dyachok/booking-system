'use client';

import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import { Loader } from '@/shared/ui/loader';
import { Title } from '@/shared/ui/title';
import { IBusinessUsersResponse, IBusinessUserPreview } from '@/shared/types';
import { getUsersByRoleApi } from '@/api/user.api';
import { BusinessItem } from './business-item';
import { Wrapper } from '@/shared/ui/wrapper';
import styles from './business.module.scss';

export const BusinessComponents: React.FC = () => {
  const [data, setData] = useState<IBusinessUsersResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUsersByRoleApi();
        setData(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const dataUsers: IBusinessUserPreview[] = data?.items || [];
  const totalItems: number = data?.total || 0;

  if (loading) {
    return <Loader />;
  }

  return (
    <Wrapper>
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
    </Wrapper>
  );
};
