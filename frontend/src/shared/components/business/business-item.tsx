'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { IBusinessUserPreview } from '@/shared/types';
import { Button } from '@/shared/ui/button';
import styles from './business.module.scss';

interface BusinessUserProps {
  data: IBusinessUserPreview;
}

export const BusinessItem: React.FC<BusinessUserProps> = ({ data }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage: string = searchParams.get('page') || '1';

  const onClickButton = (): void => {
    router.push(`/business/${data.id}?page=${currentPage}`);
  };

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
        <Button btnType="button" onClick={onClickButton} color="dark">
          Make Appointment
        </Button>
      </div>
    </div>
  );
};
