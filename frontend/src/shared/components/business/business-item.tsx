'use client';

import React from 'react';
import { IBusinessUserPreview } from '@/shared/types';
import { Button } from '@/shared/ui/button';
import styles from './business.module.scss';

interface BusinessUserProps {
  data: IBusinessUserPreview;
}

export const BusinessItem: React.FC<BusinessUserProps> = ({ data }) => {
  return (
    <div className={styles.blockItem}>
      <ul>
        <li className={styles.item}>
          <span className={styles.titles}>Business name:</span>
          <span>{data.fullName || 'N/A'}</span>
        </li>
        <li className={styles.item}>
          <span className={styles.titles}>Email:</span>
          <span>{data.email || 'N/A'}</span>
        </li>
      </ul>
      <div className={styles.button}>
        <Button btnType="button" to={`/business/${data.id}`} color="dark">
          Make Appointments
        </Button>
      </div>
    </div>
  );
};
