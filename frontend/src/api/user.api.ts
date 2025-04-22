import { AxiosError } from 'axios';
import api from './axios-instance.api';
import { PATH_KEYS, HttpStatusCode } from '@/shared/types/types';
import {
  IRegisterData,
  IRegisterResponse,
  IChangePassword,
} from '@/shared/types/user.types';
import { useAuthStore } from '../shared/store/use-auth.store';
import { getUserId } from '@/utils/get-user-id.utils';

export const createUser = async (
  userData: IRegisterData,
): Promise<IRegisterResponse> => {
  try {
    const response = await api.post(PATH_KEYS.USER, userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    if (error instanceof AxiosError) {
      if (error.response?.status === HttpStatusCode.BAD_REQUEST) {
        throw new Error('Invalid user data provided');
      }
    }
    throw error;
  }
};

export const getUserById = async (): Promise<IRegisterResponse> => {
  const token = useAuthStore.getState().authToken;
  const id = getUserId(token);
  try {
    const response = await api.get(`${PATH_KEYS.USER}/${id}`);
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

export const getUsersByRole = async (): Promise<IRegisterResponse[]> => {
  const role = useAuthStore.getState().role;
  try {
    const response = await api.get(`${PATH_KEYS.USER}/${role}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching users by role ${role}:`, error);
    throw error;
  }
};

export const updateUser = async (
  updateData: IRegisterData,
): Promise<IRegisterResponse> => {
  const token = useAuthStore.getState().authToken;
  const id = getUserId(token);
  try {
    const response = await api.patch(`${PATH_KEYS.USER}/${id}`, updateData);
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

export const deleteUser = async (): Promise<IRegisterResponse> => {
  const token = useAuthStore.getState().authToken;
  const id = getUserId(token);
  try {
    const response = await api.delete(`${PATH_KEYS.USER}/${id}`);
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

export const changePassword = async (passwordData: IChangePassword) => {
  const token = useAuthStore.getState().authToken;
  const id = getUserId(token);
  try {
    const response = await api.post(
      `${PATH_KEYS.USER}/${id}/change-password`,
      passwordData,
    );
    return response.data;
  } catch (error) {
    console.error(`Error changing password for user with ID ${id}:`, error);
    if (
      error instanceof AxiosError &&
      error.response?.status === HttpStatusCode.BAD_REQUEST
    ) {
      throw new Error('Invalid password data provided');
    }
    throw error;
  }
};
