import api from './axios-instance.api';
import { AxiosError } from 'axios';
import { ILoginData, ILoginResponse } from '@/shared/types/auth.types';
import { IRegisterData, IRegisterResponse } from '@/shared/types/user.types';
import { PATH_KEYS, HttpStatusCode } from '@/shared/types/types';
import { useAuthStore } from '../shared/store/use-auth.store';

export const registerUserApi = async (
  userData: IRegisterData,
): Promise<IRegisterResponse> => {
  try {
    const { setRole } = useAuthStore.getState();
    const { data } = await api.post(PATH_KEYS.REGISTER, userData);
    setRole(data.role);
    return data;
  } catch (error: unknown) {
    throw error;
  }
};

export const loginUserApi = async (
  loginData: ILoginData,
): Promise<ILoginResponse> => {
  try {
    const response = await api.post(PATH_KEYS.LOGIN, loginData);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (
        error.response?.status === HttpStatusCode.NOT_FOUND ||
        error.response?.status === HttpStatusCode.UNAUTHORIZED
      ) {
        throw new Error(error.response.data.message || 'Invalid credentials');
      }
    }
    throw error;
  }
};

export const refreshAccessToken = async (
  refreshToken: string,
): Promise<{ accessToken: string }> => {
  try {
    const response = await api.post(PATH_KEYS.REFRESH, { refreshToken });
    return response.data;
  } catch (error) {
    console.error('Error refreshing token:', error);
    if (
      error instanceof AxiosError &&
      error.response?.status === HttpStatusCode.UNAUTHORIZED
    ) {
      throw new Error(
        error.response.data.message || 'Invalid or expired refresh token',
      );
    }
    throw error;
  }
};

export const logoutUserApi = async (): Promise<void | { error: string }> => {
  const { logout } = useAuthStore.getState();
  logout();
  try {
    await api.post(PATH_KEYS.LOGOUT);
  } catch (error) {
    if (error instanceof AxiosError) {
      return { error: error.response?.data?.message || 'Logout failed' };
    }
    throw error;
  }
};
