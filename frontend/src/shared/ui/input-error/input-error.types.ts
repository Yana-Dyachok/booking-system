import { Control, FieldValues } from 'react-hook-form';

export type InputErrorProps<T extends FieldValues> = {
  control: Control<T>;
  field: string;
};
