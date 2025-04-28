import api from './axios-instance.api';
import { PATH_KEYS } from '@/shared/types/types';
import {
  IAppointment,
  IAppointmentRequest,
  IAppointmentResponse,
  QueryParams,
} from '@/shared/types';
import { useAuthStore } from '../shared/store/use-auth.store';
import { getUserId, getHeaders } from '@/utils';

export const createAppointmentApi = async (
  dto: IAppointmentRequest,
): Promise<IAppointmentResponse> => {
  const token = useAuthStore.getState().authToken;
  const header = getHeaders(token);

  try {
    const response = await api.post(
      `${PATH_KEYS.APPOINTMENTS}`,
      dto,
      header ? { headers: header } : undefined,
    );
    return response.data;
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw error;
  }
};

export const getClientAppointmentsApi = async (
  query: QueryParams = {},
): Promise<{ items: IAppointmentResponse[]; total: number }> => {
  try {
    const response = await api.get(`${PATH_KEYS.APPOINTMENTS_CLIENT}`, {
      params: query,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching client appointments:', error);
    throw error;
  }
};

export const updateAppointmentApi = async (
  dto: Partial<IAppointment>,
): Promise<IAppointmentResponse> => {
  const token = useAuthStore.getState().authToken;
  const header = getHeaders(token);
  const id = getUserId(token);

  try {
    const response = await api.put(
      `${PATH_KEYS.APPOINTMENTS}/${id}`,
      dto,
      header ? { headers: header } : undefined,
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating appointment with ID ${id}:`, error);
    throw error;
  }
};

export const deleteAppointmentApi = async (): Promise<IAppointmentResponse> => {
  const token = useAuthStore.getState().authToken;
  const id = getUserId(token);
  const header = getHeaders(token);

  try {
    const response = await api.delete(
      `${PATH_KEYS.APPOINTMENTS}/${id}`,
      header ? { headers: header } : undefined,
    );
    return response.data;
  } catch (error) {
    console.error(`Error deleting appointment with ID ${id}:`, error);
    throw error;
  }
};
