'use client';
import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { Title } from '@/shared/ui/title';
import { BackButton } from '@/shared/ui/back-button/back-button';
import { Button } from '@/shared/ui/button';
import { Wrapper } from '@/shared/ui/wrapper';
import { Loader } from '@/shared/ui/loader';
import { schemaMakeAppointment } from '@/utils';
import {
  IAppointmentInput,
  IAppointmentRequest,
  IAppointmentResponse,
} from '@/shared/types';
import { InputError } from '@/shared/ui/input-error';
import { createAppointmentApi } from '@/api/appointment.api';
import styles from './business-user.module.scss';

export const BusinessUser: React.FC<{ id: string }> = ({ id }) => {
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

  const calculateDuration = (start: Dayjs | null, end: Dayjs | null) => {
    if (start && end) {
      const diffInMinutes = end.diff(start, 'minute');
      return diffInMinutes > 0 ? diffInMinutes : 0;
    }
    return 0;
  };

  const { mutate: createAppointment, isPending } = useMutation<
    IAppointmentResponse,
    AxiosError,
    IAppointmentInput
  >({
    mutationFn: async (
      data: IAppointmentInput,
    ): Promise<IAppointmentResponse> => {
      const appointment: IAppointmentRequest = {
        businessId: id,
        date: dayjs(data.date).format('YYYY-MM-DD'),
        time: dayjs(data.startTime).format('HH:mm'),
        durationMin: calculateDuration(
          dayjs(data.startTime),
          dayjs(data.endTime),
        ),
      };
      return await createAppointmentApi(appointment);
    },
    onSuccess: () => {
      toast.success('Appointment created!');
    },
    onError: (error: AxiosError): void => {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data.message || 'Something went wrong.');
    },
  });
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
              <div className={styles.inputBlock}>
                <label className={styles.label}>Date</label>
                <Controller
                  name="date"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      value={field.value}
                      format="YYYY/MM/DD"
                      sx={{
                        width: '250px',
                        backgroundColor: '#ffffff',
                        borderRadius: '5px',
                      }}
                      onChange={(newValue) => field.onChange(newValue)}
                    />
                  )}
                />
                <InputError control={control} field="date" />
              </div>
              <div className={styles.inputBlock}>
                <label className={styles.label}>Start time</label>
                <Controller
                  name="startTime"
                  control={control}
                  render={({ field }) => (
                    <TimePicker
                      {...field}
                      value={field.value}
                      onChange={(newValue) => field.onChange(newValue)}
                      sx={{
                        width: '250px',
                        backgroundColor: '#ffffff',
                        borderRadius: '5px',
                      }}
                    />
                  )}
                />
                <InputError control={control} field="startTime" />
                <p className={styles.error}>
                  {errors['' as keyof typeof errors]?.message
                    ? errors['' as keyof typeof errors]?.message
                    : ''}
                </p>
              </div>
              <div className={styles.inputBlock}>
                <label className={styles.label}>End time</label>
                <Controller
                  name="endTime"
                  control={control}
                  render={({ field }) => (
                    <TimePicker
                      {...field}
                      value={field.value}
                      onChange={(newValue) => field.onChange(newValue)}
                      sx={{
                        width: '250px',
                        backgroundColor: '#ffffff',
                        borderRadius: '5px',
                      }}
                    />
                  )}
                />
                <InputError control={control} field="endTime" />
              </div>
            </div>
          </div>
          <div className={styles.buttonBlock}>
            <Button btnType="submit" color="light" disabled={isPending}>
              {isPending ? <Loader /> : 'Create Meeting'}
            </Button>
          </div>
        </form>
      </Wrapper>
    </LocalizationProvider>
  );
};
