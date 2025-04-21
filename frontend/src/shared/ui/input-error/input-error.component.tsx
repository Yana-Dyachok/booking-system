import React from 'react';
import { FieldValues, useFormState } from 'react-hook-form';
import { InputErrorProps } from './input-error.types';

import styles from './input-error.module.scss';

export function InputError<T extends FieldValues>({
  control,
  field,
}: InputErrorProps<T>) {
  const { errors } = useFormState<T>({
    control,
  });

  return errors[field]?.message ? (
    <p className={styles.error}>{String(errors[field]?.message)}</p>
  ) : null;
}
