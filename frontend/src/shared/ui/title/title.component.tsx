import React from 'react';
import styles from './title.module.scss';

export const Title: React.FC<{ title: string }> = ({ title }) => {
  return <h1 className={styles.title}>{title}</h1>;
};
