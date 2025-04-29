'use client';

import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import { Loader } from '@/shared/ui/loader';
import { Title } from '@/shared/ui/title';
import { IAppointmentResponse, IAllAppointmentResponse } from '@/shared/types';
import { getClientAppointmentsApi } from '@/api/appointment.api';
import { ClientAppointmentsItem } from './client-appointments-item.component';
import { Wrapper } from '@/shared/ui/wrapper';
import styles from '../business/business.module.scss';

export const ClientAppointments: React.FC = () => {
  const [data, setData] = useState<IAllAppointmentResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getClientAppointmentsApi({ page, limit: 5 });
        setData(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const dataUsers: IAppointmentResponse[] = data?.items || [];
  const totalItems: number = data?.total || 0;

  if (loading) {
    return <Loader />;
  }

  return (
    <Wrapper>
      <div className={styles.wrapper}>
        <Title title="My Appointments" />
        {+totalItems > 0 ? (
          <div className={styles.blockInner}>
            <div className={styles.usersBlock}>
              {dataUsers.map((item, index) => (
                <ClientAppointmentsItem
                  data={item}
                  key={index + item.id}
                  setData={setData}
                  page={page}
                />
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
          <h2 className={styles.titles}>There are no appointments</h2>
        )}
      </div>
    </Wrapper>
  );
};
