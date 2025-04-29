import { parseJwt } from './pars-jwt.utils';

export const getUserRole = (token: string | null) => {
  const payload = token ? parseJwt<{ role: string }>(token) : undefined;
  return payload?.role;
};
