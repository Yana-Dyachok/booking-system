import axios from 'axios';
import { BASE_URL } from '../../next.config';
import { useAuthStore } from '../shared/store/use-auth.store';
import { PATH_KEYS, HttpStatusCode, Role } from '@/shared/types/types';
import { getUserRole } from '@/utils';

const api = axios.create({
  baseURL: BASE_URL ?? 'http://localhost:4000',
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().authToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === HttpStatusCode.UNAUTHORIZED &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refreshToken = useAuthStore.getState().refreshToken;

      if (refreshToken) {
        try {
          const refreshResponse = await axios.post(
            `${api.defaults.baseURL}${PATH_KEYS.REFRESH}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
              withCredentials: true,
            },
          );

          const { accessToken, refreshToken: newRefreshToken } =
            refreshResponse.data;
          const { setAuthToken, setRefreshToken, setRole } = useAuthStore();
          setAuthToken(accessToken);
          setRefreshToken(newRefreshToken);
          const role = getUserRole(accessToken);
          setRole(role as Role);
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          useAuthStore.getState().logout();
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
          return Promise.reject(refreshError);
        }
      } else {
        useAuthStore.getState().logout();
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
