'use client';

import React from 'react';
import { FieldValues, Controller, Control, Path } from 'react-hook-form';
import { Role } from '@/shared/types';
import styles from './role-selector.module.scss';

interface RoleSelectorProps<T extends FieldValues = FieldValues> {
  control: Control<T>;
}

export const RoleSelector = <T extends FieldValues>({
  control,
}: RoleSelectorProps<T>) => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>Select role:</label>
      <Controller
        control={control}
        name={'role' as Path<T>}
        render={({ field }) => (
          <div className={styles.block}>
            <div className={styles.radioBlock}>
              <input
                className={styles.inputRadio}
                type="radio"
                value={Role.CLIENT}
                checked={field.value === Role.CLIENT}
                onChange={field.onChange}
              />
              <label>Client</label>
            </div>
            <div className={styles.radioBlock}>
              <input
                className={styles.inputRadio}
                type="radio"
                value={Role.BUSINESS}
                checked={field.value === Role.BUSINESS}
                onChange={field.onChange}
              />
              <label>Business</label>
            </div>
          </div>
        )}
      />
    </div>
  );
};
