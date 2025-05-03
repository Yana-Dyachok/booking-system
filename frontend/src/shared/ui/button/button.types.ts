import { ReactNode } from 'react';

export type ButtonProps = {
  btnType: 'button' | 'submit';
  children: string | ReactNode;
  to?: string;
  disabled?: boolean;
  color: 'dark' | 'light';
  onClick?: () => void;
};
