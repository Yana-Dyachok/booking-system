'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { schemaChangePassword } from '@/utils';
import { IVallidPassword } from '@/shared/types';
import { Loader } from '@/shared/ui/loader';
import { changePasswordApi } from '@/api/user.api';
import { Wrapper } from '@/shared/ui/wrapper';
import { Title } from '@/shared/ui/title';
import { BackButton } from '@/shared/ui/back-button/back-button';
import { HttpStatusCode } from '@/shared/types';
import styles from './change-password.module.scss';

export const ChangePasswordComponent: React.FC = () => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { isDirty, isValid },
  } = useForm<IVallidPassword>({
    resolver: yupResolver(schemaChangePassword),
    mode: 'onChange',
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: IVallidPassword) => {
      return await changePasswordApi({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
    },
    onSuccess: () => {
      toast.success('Info changed successfully');
    },
    onError: (error: AxiosError) => {
      const axiosError = error as AxiosError<{ message: string }>;
      if (
        axiosError?.response?.status === HttpStatusCode.BAD_REQUEST ||
        axiosError?.response?.data?.message === 'Current password is incorrect'
      ) {
        setError('currentPassword', {
          type: 'manual',
          message: 'Current password is incorrect',
        });
      } else {
        toast.error(`Error updating password: ${String(error)}`);
      }
    },
  });

  const onSubmit = (data: IVallidPassword) => {
    mutate(data);
  };

  return (
    <Wrapper>
      <form className={styles.changeForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.header}>
          <BackButton /> <Title title="Change password"></Title>
        </div>
        <Input
          control={control}
          name="currentPassword"
          label="Current Password"
          defaultValue=""
        />
        <Input
          control={control}
          name="newPassword"
          label="New Password"
          defaultValue=""
          toggleShowPassword={true}
        />
        <Input
          control={control}
          name="confirmPassword"
          label="Confirm Password"
          defaultValue=""
          toggleShowPassword={true}
        />
        <Button btnType="submit" color="dark" disabled={!isDirty || !isValid}>
          {isPending ? <Loader /> : 'Save'}
        </Button>
      </form>
    </Wrapper>
  );
};
