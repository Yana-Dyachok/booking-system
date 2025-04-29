'use client';
import styles from './header.module.scss';
import { LogOutButton } from '../log-out-button/log-out-button.component';
import { ProfileSvg } from '@/shared/assets/svg/profile.svg';
import { LogoSvg } from '@/shared/assets/svg/logo.svg';
import { LinkNav } from '@/shared/ui/link-nav';
import { useAuthStore } from '@/shared/store';
import { Role } from '@/shared/types';

export const Header = () => {
  const role = useAuthStore.getState().role;
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
        <nav>
          <ul className={styles.navList}>
            <li>
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
            <li>
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
            <li>
              <LinkNav
                href="/profile"
                activeClassName={styles.active}
                className={styles.link}
              >
                <ProfileSvg />
              </LinkNav>
            </li>
            <li>
              <LogOutButton />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
