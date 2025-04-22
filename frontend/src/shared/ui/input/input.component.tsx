import React, { useState, useRef } from 'react';
import { useController, FieldValues, FieldPath } from 'react-hook-form';
import { InputError } from '../input-error/index';
import { ToggleEyeIcons } from '../toggle-eye-icons/toggle-eye-icons.component';
import { InputProps } from './input.types';
import styles from './input.module.scss';

export function Input<
  T extends FieldValues,
  N extends FieldPath<T> = FieldPath<T>,
>({
  control,
  name,
  rules,
  defaultValue,
  label,
  toggleShowPassword = false,
}: InputProps<T, N>) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    field: { value, onBlur, onChange },
    fieldState: { error },
  } = useController({
    control,
    defaultValue,
    name,
    rules,
  });

  const handleFocus = (): void => {
    setIsFocused(true);
  };

  const handleBlur = (): void => {
    onBlur();
    setIsFocused(false);
  };

  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.inputBlock}>
        <input
          type={
            toggleShowPassword ? (showPassword ? 'text' : 'password') : 'text'
          }
          value={value}
          onChange={onChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          className={`${styles.inputText} ${
            value && !error ? styles.correct : ''
          } ${isFocused ? styles.focused : ''} ${error ? styles.wrong : ''}`}
          autoCapitalize="none"
          ref={inputRef}
        />
        {toggleShowPassword && (
          <ToggleEyeIcons
            isShow={showPassword}
            onToggle={() => setShowPassword((prev) => !prev)}
          />
        )}
      </div>
      <InputError<T> control={control} field={name} />
    </div>
  );
}
