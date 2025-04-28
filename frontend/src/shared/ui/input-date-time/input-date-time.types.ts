import { Control, FieldValues, Path } from 'react-hook-form';

export type DataProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  type: 'date' | 'time';
};
