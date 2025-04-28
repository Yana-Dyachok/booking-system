'use client';

import React from 'react';
import { Controller, FieldValues } from 'react-hook-form';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { InputError } from '@/shared/ui/input-error';
import { DataProps } from './input-date-time.types';
import styles from './input-date-time.module.scss';

export const DateTimeField = <T extends FieldValues>({
  name,
  control,
  label,
  type,
}: DataProps<T>) => {
  const Picker = type === 'date' ? DatePicker : TimePicker;

  return (
    <div className={styles.inputBlock}>
      <label className={styles.label}>{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Picker
            {...field}
            value={field.value}
            onChange={(newValue) => field.onChange(newValue)}
            sx={{
              width: '250px',
              backgroundColor: '#ffffff',
              borderRadius: '5px',
            }}
            format={type === 'date' ? 'YYYY/MM/DD' : undefined}
            slotProps={{
              textField: {
                InputProps: {
                  sx: {
                    fontSize: '20px',
                  },
                },
              },
            }}
          />
        )}
      />
      <InputError control={control} field={name} />
    </div>
  );
};
