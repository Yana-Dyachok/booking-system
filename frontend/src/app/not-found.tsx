import React from 'react';
import { Button } from '@/shared/ui/button';
import styles from '../shared/styles/not-found.module.scss';

export const handle = { hidePath: true };

const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.errorBlock}>
      <h1 className={styles.title}> Ooops... Page not found</h1>
      <section className={styles.errorContainer}>
        <span className={styles.spanError}>
          <span className={styles.digitFirst}>4</span>
        </span>
        <span className={`${styles.spanError} ${styles.digitSecond}`}>0</span>
        <span className={styles.spanError}>
          <span className={styles.digitThird}>4</span>
        </span>
      </section>
      <Button btnType="button" to="/" color="dark">
        Back to main
      </Button>
    </div>
  );
};

export default NotFoundPage;
