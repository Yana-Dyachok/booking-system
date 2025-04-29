'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getAppointmentByIdApi } from '@/api/appointment.api';
import { IAppointmentResponse } from '@/shared/types';
import { formatDate, formatTime } from '@/utils';
import { Wrapper } from '@/shared/ui/wrapper';
import { Loader } from '@/shared/ui/loader';

export const EditAppointments: React.FC = () => {
  const { id } = useParams();
  const [data, setData] = useState<IAppointmentResponse | null>(null);

  useEffect(() => {
    if (!id || typeof id !== 'string') return;

    const fetchUser = async () => {
      const response = await getAppointmentByIdApi(id);
      setData(response);
      console.log(response);
    };

    fetchUser();
  }, [id]);

  if (!data) return <Loader />;

  return (
    <Wrapper>
      <p>Name: {data.business.fullName}</p>
      <p>Date: {data.date ? formatDate(data.date) : 'N/A'}</p>
      <p>Time: {data.date ? formatTime(data.date) : 'N/A'}</p>
    </Wrapper>
  );
};
