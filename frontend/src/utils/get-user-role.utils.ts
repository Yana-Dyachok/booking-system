import { parseJwt } from './pars-jwt.utils';
import { Role } from '@/shared/types';

export const getUserRole = (token: string | null): Role | undefined => {
  const payload = token ? parseJwt<{ role: Role }>(token) : undefined;
  return payload?.role;
};
