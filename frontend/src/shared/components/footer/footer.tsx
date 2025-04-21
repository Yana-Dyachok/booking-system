'use client';
import { LinkItem } from '@/shared/ui/link/link';

import style from './footer.module.scss';

export const Footer = () => {
  const theme = 'light';
  return (
    <footer className={style.footer}>
      <div className={style.wrapper}></div>
    </footer>
  );
};
