'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Title } from '@/shared/ui/title';
import { BackButton } from '@/shared/ui/back-button/back-button';
import { Button } from '@/shared/ui/button';
import { Wrapper } from '@/shared/ui/wrapper';
import { Loader } from '@/shared/ui/loader';
import { schemaMakeAppointment } from '@/utils';
import { IAppointmentInput } from '@/shared/types';
import { useCreateAppointment } from '@/shared/hook';
import { DateTimeField } from '@/shared/ui/input-date-time';
import styles from './business-user.module.scss';

export const BusinessUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    throw new Error('ID is missing from route params');
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IAppointmentInput>({
    resolver: yupResolver(schemaMakeAppointment),
    defaultValues: {
      date: null,
      startTime: null,
      endTime: null,
    },
  });

  const { mutate: createAppointment, isPending } = useCreateAppointment(id);

  const onSubmit = (data: IAppointmentInput) => {
    createAppointment(data);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Wrapper>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.wrapper}>
          <div>
            <div className={styles.header}>
              <BackButton /> <Title title="Select Appointment Date" />
            </div>

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
            <p className={styles.error}>
              {errors['' as keyof typeof errors]?.message
                ? errors['' as keyof typeof errors]?.message
                : ''}
            </p>
          </div>
          <div className={styles.buttonBlock}>
            <Button btnType="submit" color="light" disabled={isPending}>
              {isPending ? <Loader /> : 'Create Appointment'}
            </Button>
          </div>
        </form>
      </Wrapper>
    </LocalizationProvider>
  );
};
