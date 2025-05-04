'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Pagination from '@mui/material/Pagination';
import { Loader } from '@/shared/ui/loader';
import { Title } from '@/shared/ui/title';
import { IAllAppointmentResponse, IAppointmentResponse } from '@/shared/types';
import { getClientAppointmentsApi } from '@/api/appointment.api';
import { ClientAppointmentsItem } from './client-appointments-item.component';
import { usePaginatedFetch } from '@/shared/hook';
import { Wrapper } from '@/shared/ui/wrapper';
import styles from '../business/business.module.scss';

export const ClientAppointments: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageFromQuery: number = Number(searchParams.get('page')) || 1;

  const { data, isLoading, page, setPage, setData } = usePaginatedFetch<
    IAppointmentResponse,
    IAllAppointmentResponse
  >({
    fetchFunction: getClientAppointmentsApi,
    initialPage: pageFromQuery,
  });

  const dataUsers: IAppointmentResponse[] = data?.items || [];
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
      )}
    </Wrapper>
  );
};
