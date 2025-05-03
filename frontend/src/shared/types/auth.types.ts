import { Role } from './types';
export interface IAuthState {
  authToken: string | null;
  refreshToken: string | null;
  role: Role | null;
  lastVisitedPage: string | null;
  setAuthToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;
  setRole: (role: Role | null) => void;
  setLastVisitedPage: (page: string | null) => void;
  logout: () => void;
}

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface ILoginData {
  email: string;
  password: string;
}
