'use client';

import React from 'react';
import { IBusinessUserPreview } from '@/shared/types';
import { Button } from '@/shared/ui/button';
import styles from '../profile/profile.module.scss';

interface IBusinessUserProps {
  data: IBusinessUserPreview;
}

export const BusinessItem: React.FC<IBusinessUserProps> = ({ data }) => {
  return (
    <div className={styles.wrapper}>
      <ul>
        <li className={styles.item}>
          <span className={styles.titles}>Business:</span>{' '}
          <span>{data.fullName || 'N/A'}</span>
        </li>
        <li className={styles.item}>
          <span className={styles.titles}>Email:</span>{' '}
          <span>{data.email || 'N/A'}</span>
        </li>
      </ul>
      <Button btnType="button" to={`/business/${data.id}`} color="light">
        add
      </Button>
    </div>
  );
};
