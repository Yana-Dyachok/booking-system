interface Headers {
  Authorization?: string;
  [key: string]: string | undefined;
}
export const getHeaders = (token: string | null): Headers | undefined => {
  return token ? { Authorization: `Bearer ${token}` } : undefined;
};
