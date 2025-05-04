import React from 'react';
import { useRouter } from 'next/navigation';
import { logoutUserApi } from '@/api/auth.api';
import { LogOutSvg } from '@/shared/assets/svg/logout.svg';
import styles from './log-out.module.scss';

export const LogOutButton: React.FC<{ flag: boolean }> = ({ flag }) => {
  const router = useRouter();
  const handleLogout = async (): Promise<void> => {
    try {
      await logoutUserApi();
      router.push('./login');
    } catch (error: unknown) {
      console.error('Logout error:', error);
    }
  };

  return (
    <button type="button" onClick={handleLogout} className={styles.logOut}>
      {flag ? 'Log out' : <LogOutSvg />}
    </button>
  );
};
