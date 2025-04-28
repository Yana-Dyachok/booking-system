'use client';
import style from './footer.module.scss';

export const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className={style.wrapper}>
        <h3 className={style.title}>Copyright @ 2025 Booking System</h3>
      </div>
    </footer>
  );
};
