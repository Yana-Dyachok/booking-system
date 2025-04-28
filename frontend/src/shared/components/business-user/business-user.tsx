'use client';
import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Title } from '@/shared/ui/title';
import { BackButton } from '@/shared/ui/back-button/back-button';
import { Button } from '@/shared/ui/button';
import { Wrapper } from '@/shared/ui/wrapper';
import { schemaMakeAppointment } from '@/utils';
import { IAppointmentInput, IAppointment } from '@/shared/types';
import { InputError } from '@/shared/ui/input-error';
import styles from './business-user.module.scss';

export const BusinessUser: React.FC<{ id: string }> = ({ id }) => {
  console.log(id);

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
  const onSubmit = (data: IAppointmentInput) => {
    const appointment: IAppointment = {
      date: data.date ? dayjs(data.date).toDate() : null,
      time: data.startTime ? dayjs(data.startTime).format('HH:mm') : '',
      duration: `${calculateDuration(
        dayjs(data.startTime),
        dayjs(data.endTime),
      )}`,
    };

    console.log('appointment: ', appointment);
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
            <Button btnType="submit" color="light">
              Create Meeting
            </Button>
          </div>
        </form>
      </Wrapper>
    </LocalizationProvider>
  );
};
