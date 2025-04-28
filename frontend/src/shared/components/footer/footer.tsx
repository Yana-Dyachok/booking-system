import Link from 'next/link';
import { GitHubSvg } from '@/shared/assets/svg/github.svg';
import styles from './footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <h3 className={styles.title}>Copyright @ 2025</h3>
        <h3 className={styles.title}>Booking System</h3>
        <Link href="https://github.com/Yana-Dyachok" className={styles.ghLink}>
          <GitHubSvg />
        </Link>
      </div>
    </footer>
  );
};
