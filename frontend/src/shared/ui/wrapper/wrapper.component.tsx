import React, { ReactNode } from 'react';
import styles from './wrapper.module.scss';

interface WrapperProps {
  children?: ReactNode;
}

export const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return <section className={styles.wrapper}>{children}</section>;
};
