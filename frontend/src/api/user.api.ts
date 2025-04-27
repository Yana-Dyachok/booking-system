import { AxiosError } from 'axios';
import api from './axios-instance.api';
import { PATH_KEYS, HttpStatusCode } from '@/shared/types/types';
import {
  IRegisterResponse,
  IChangePassword,
  ICreateUser,
  IBusinessUsersResponse,
  QueryParams,
} from '@/shared/types';
import { useAuthStore } from '../shared/store/use-auth.store';
import { getUserId, getHeaders } from '@/utils';

export const getUserByIdApi = async (): Promise<IRegisterResponse> => {
  const token = useAuthStore.getState().authToken;
  const header = getHeaders(token);
  const id = getUserId(token);
  try {
    const response = await api.get(
      `${PATH_KEYS.USER}/${id}`,
      header ? { headers: header } : undefined,
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error);
    if (
      error instanceof AxiosError &&
      error.response?.status === HttpStatusCode.NOT_FOUND
    ) {
      throw new Error(`User with ID ${id} not found`);
    }
    throw error;
  }
};

export const getUsersByRoleApi = async (
  query: QueryParams = {},
): Promise<IBusinessUsersResponse> => {
  try {
    const response = await api.get(PATH_KEYS.USER_BUSINESS, {
      params: query,
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching business users:', error);
    throw error;
  }
};

export const updateUserApi = async (
  updateData: Partial<ICreateUser>,
): Promise<IRegisterResponse> => {
  const token = useAuthStore.getState().authToken;
  const header = getHeaders(token);
  const id = getUserId(token);
  try {
    const response = await api.put(
      `${PATH_KEYS.USER}/${id}`,
      updateData,
      header ? { headers: header } : undefined,
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating user with ID ${id}:`, error);
    if (
      error instanceof AxiosError &&
      error.response?.status === HttpStatusCode.BAD_REQUEST
    ) {
      throw new Error('Invalid update data provided');
    }
    throw error;
  }
};

export const deleteUserApi = async (): Promise<IRegisterResponse> => {
  const { logout, authToken } = useAuthStore.getState();
  const header = getHeaders(authToken);
  const id = getUserId(authToken);
  try {
    const response = await api.delete(
      `${PATH_KEYS.USER}/${id}`,
      header ? { headers: header } : undefined,
    );
    logout();
    return response.data;
  } catch (error) {
    console.error(`Error deleting user with ID ${id}:`, error);
    if (
      error instanceof AxiosError &&
      error.response?.status === HttpStatusCode.NOT_FOUND
    ) {
      throw new Error(`User with ID ${id} not found`);
    }
    throw error;
  }
};

export const changePasswordApi = async (passwordData: IChangePassword) => {
  const token = useAuthStore.getState().authToken;
  const header = getHeaders(token);
  const id = getUserId(token);
  try {
    const response = await api.put(
      `${PATH_KEYS.USER}/${id}/change-password`,
      passwordData,
      header ? { headers: header } : undefined,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
