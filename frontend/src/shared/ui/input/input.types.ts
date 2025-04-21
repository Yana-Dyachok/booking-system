import React from 'react';
import {
  FieldValues,
  FieldPath,
  FieldPathValue,
  Control,
  RegisterOptions,
} from 'react-hook-form';

export type InputProps<
  T extends FieldValues = FieldValues,
  N extends FieldPath<T> = FieldPath<T>,
> = {
  name: N;
  control: Control<T>;
  defaultValue: FieldPathValue<T, N>;
  rules?:
    | Omit<
        RegisterOptions<T, N>,
        'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
      >
    | undefined;
  label?: string;
  toggleShowPassword?: boolean;
  extraInputContainerStyles?: React.CSSProperties;
  extraErrorStyles?: React.CSSProperties;
};
