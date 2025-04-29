'use client';

import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import { getAppointmentByIdApi } from '@/api/appointment.api';
import { IAppointmentInput } from '@/shared/types';
import { schemaMakeAppointment } from '@/utils';
import { useUpdateAppointment } from '@/shared/hook';

import { Wrapper } from '@/shared/ui/wrapper';
import { Title } from '@/shared/ui/title';
import { BackButton } from '@/shared/ui/back-button/back-button';
import { Button } from '@/shared/ui/button';
import { Loader } from '@/shared/ui/loader';
import { DateTimeField } from '@/shared/ui/input-date-time';

import styles from '../business-user/business-user.module.scss';

export const EditAppointments: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) throw new Error('ID is missing from route params');

  const { data: appointment, isLoading } = useQuery({
    queryKey: ['appointment', id],
    queryFn: () => getAppointmentByIdApi(id),
    refetchOnWindowFocus: false,
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    trigger,
  } = useForm<IAppointmentInput>({
    resolver: yupResolver(schemaMakeAppointment),
    mode: 'onChange',
    defaultValues: {
      date: null,
      startTime: null,
      endTime: null,
    },
  });

  useEffect(() => {
    if (appointment) {
      const date = dayjs(appointment.date);
      const startTime = dayjs(appointment.date);
      const endTime = dayjs(appointment.date).add(
        appointment.durationMin,
        'minute',
      );

      reset({
        date,
        startTime,
        endTime,
      });

      trigger();
    }
  }, [appointment, reset, trigger]);

  const { mutate: updateAppointment, isPending } = useUpdateAppointment(id);

  const onSubmit = (data: IAppointmentInput) => {
    updateAppointment(data);
  };

  if (isLoading) return <Loader />;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Wrapper>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.wrapper}>
          <div>
            <div className={styles.header}>
              <BackButton /> <Title title="Edit Appointment Date" />
            </div>
            <p className={styles.titles}>
              Business name: {appointment?.business.fullName}
            </p>
            <div className={styles.inputsContainer}>
              <DateTimeField
                name="date"
                control={control}
                label="Date"
                type="date"
              />
              <DateTimeField
                name="startTime"
                control={control}
                label="Start time"
                type="time"
              />
              <DateTimeField
                name="endTime"
                control={control}
                label="End time"
                type="time"
              />
            </div>

            {errors['' as keyof typeof errors]?.message && (
              <p className={styles.error}>
                {errors['' as keyof typeof errors]?.message}
              </p>
            )}
          </div>

          <div className={styles.buttonBlock}>
            <Button
              btnType="submit"
              color="light"
              disabled={!isValid || isPending}
            >
              {isPending ? <Loader /> : 'Save'}
            </Button>
          </div>
        </form>
      </Wrapper>
    </LocalizationProvider>
  );
};
