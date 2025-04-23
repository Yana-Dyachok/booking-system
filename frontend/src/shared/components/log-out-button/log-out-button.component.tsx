import React from 'react';
import { logoutUserApi } from '@/api/auth.api';
import { LogOutSvg } from '@/shared/assets/svg/logout.svg';
import styles from './log-out.module.scss';

export const LogOutButton: React.FC = () => {
  const handleLogout = async (): Promise<void> => {
    try {
      await logoutUserApi();
    } catch (error: unknown) {
      console.error('Logout error:', error);
    }
  };

  return (
    <button type="button" onClick={handleLogout} className={styles.logOut}>
      <LogOutSvg />
    </button>
  );
};
