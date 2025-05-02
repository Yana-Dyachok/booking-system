'use client';

import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { updateAppointmentApi } from '@/api/appointment.api';
import {
  IAppointmentInput,
  IAppointment,
  IAppointmentResponse,
} from '@/shared/types';

const calculateDuration = (
  start: dayjs.Dayjs | null,
  end: dayjs.Dayjs | null,
): number => {
  if (start && end) {
    const diffInMinutes = end.diff(start, 'minute');
    return diffInMinutes > 0 ? diffInMinutes : 0;
  }
  return 0;
};

export const useUpdateAppointment = (id: string) => {
  return useMutation<IAppointmentResponse, AxiosError, IAppointmentInput>({
    mutationFn: async (data) => {
      const appointment: Partial<IAppointment> = {
        date: dayjs(data.date).format('YYYY-MM-DD'),
        time: dayjs(data.startTime).format('HH:mm'),
        durationMin: calculateDuration(
          dayjs(data.startTime),
          dayjs(data.endTime),
        ),
      };
      return await updateAppointmentApi(id, appointment);
    },
    onSuccess: (): void => {
      toast.success('Appointment updated!');
    },
    onError: (error): void => {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data.message || 'Something went wrong.');
    },
  });
};
