'use client';

import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { createAppointmentApi } from '@/api/appointment.api';
import {
  IAppointmentInput,
  IAppointmentRequest,
  IAppointmentResponse,
} from '@/shared/types';

const calculateDuration = (
  start: dayjs.Dayjs | null,
  end: dayjs.Dayjs | null,
) => {
  if (start && end) {
    const diffInMinutes = end.diff(start, 'minute');
    return diffInMinutes > 0 ? diffInMinutes : 0;
  }
  return 0;
};

export const useCreateAppointment = (businessId: string) => {
  return useMutation<IAppointmentResponse, AxiosError, IAppointmentInput>({
    mutationFn: async (data) => {
      const appointment: IAppointmentRequest = {
        businessId,
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
    onError: (error) => {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data.message || 'Something went wrong.');
    },
  });
};
