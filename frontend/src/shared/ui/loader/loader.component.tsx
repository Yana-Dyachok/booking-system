import React from 'react';
import styles from './loader.module.scss';

export const Loader: React.FC = () => {
  return (
    <section className={styles.loaderContainer}>
      <div className={styles.loader} role="loader"></div>
    </section>
  );
};
