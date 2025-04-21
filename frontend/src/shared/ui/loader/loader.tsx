import React from 'react';
import styles from './loader.module.scss';

const Loader: React.FC = () => {
  return (
    <section className={styles.loaderContainer}>
      <div className={styles.loader} role="loader"></div>
    </section>
  );
};

export default Loader;
