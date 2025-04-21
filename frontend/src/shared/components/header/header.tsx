'use client';
import Link from 'next/link';
import { Button } from '@/shared/ui/button/button';
import { LinkItem } from '@/shared/ui/link/link';
import style from './header.module.scss';

export const Header = () => {
  const theme = 'light';
  return (
    <header className={style.header}>
      <div className={style.wrapper}>
        <Link href="/"></Link>
        <nav>
          <ul className={style.navList}>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
