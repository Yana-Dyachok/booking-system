export interface IAuthState {
  authToken: string | null;
  refreshToken: string | null;
  role: string | null;
  setAuthToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;
  setRole: (role: string | null) => void;
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
