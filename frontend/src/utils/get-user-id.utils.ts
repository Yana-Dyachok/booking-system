import { parseJwt } from './pars-jwt.utils';
export const getUserId = (token: string | null) => {
  const payload = token ? parseJwt<{ sub: string }>(token) : undefined;
  return payload?.sub;
};
