'use client';

import React, { useState } from 'react';
import { LogOutButton } from '../log-out-button/log-out-button.component';
import { ProfileSvg } from '@/shared/assets/svg/profile.svg';
import { LogoSvg } from '@/shared/assets/svg/logo.svg';
import { LinkNav } from '@/shared/ui/link-nav';
import { useAuthStore } from '@/shared/store';
import { Role } from '@/shared/types';
import styles from './header.module.scss';

export const Header = () => {
  const role = useAuthStore.getState().role;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <LinkNav
          href="/"
          activeClassName={styles.active}
          className={styles.link}
        >
          <LogoSvg />
        </LinkNav>
        <button
          className={styles.burgerMenu}
          onClick={toggleMenu}
          type="button"
        >
          <div
            className={
              isMenuOpen
                ? `${styles.burgerIcon} ${styles.open}`
                : styles.burgerIcon
            }
          >
            <span className={styles.spanBurger} />
            <span className={styles.spanBurger} />
            <span className={styles.spanBurger} />
          </div>
        </button>
        <nav
          className={
            isMenuOpen ? `${styles.navMain} ${styles.open}` : styles.navMain
          }
        >
          <ul className={styles.navList}>
            <li onClick={() => setIsMenuOpen(false)}>
              {role === Role.CLIENT && (
                <LinkNav
                  href="/appointments"
                  activeClassName={styles.active}
                  className={styles.link}
                >
                  Appointments
                </LinkNav>
              )}
            </li>
            <li onClick={() => setIsMenuOpen(false)}>
              {role === Role.CLIENT && (
                <LinkNav
                  href="/business"
                  activeClassName={styles.active}
                  className={styles.link}
                >
                  Business
                </LinkNav>
              )}
            </li>
            <li onClick={() => setIsMenuOpen(false)}>
              <LinkNav
                href="/profile"
                activeClassName={styles.active}
                className={styles.link}
              >
                {isMenuOpen ? 'Profile' : <ProfileSvg />}
              </LinkNav>
            </li>
            <li className={styles.link} onClick={() => setIsMenuOpen(false)}>
              {isMenuOpen ? 'Log out' : <LogOutButton />}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
