import { Role } from './types';
export interface IAuthState {
  authToken: string | null;
  refreshToken: string | null;
  role: Role | null;
  setAuthToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;
  setRole: (role: string | null) => void;
  logout: () => void;
}

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
  role: Role;
}

export interface ILoginData {
  email: string;
  password: string;
}
