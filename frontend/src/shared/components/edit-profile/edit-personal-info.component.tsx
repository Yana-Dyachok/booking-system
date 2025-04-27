'use client';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { schemaUpdateProfile } from '@/utils';
import { IPersonalInfoData, ICreateUser, Role } from '@/shared/types';
import { Loader } from '@/shared/ui/loader';
import { getUserByIdApi, updateUserApi } from '@/api/user.api';
import { Wrapper } from '@/shared/ui/wrapper';
import { Title } from '@/shared/ui/title';
import { BackButton } from '@/shared/ui/back-button/back-button';
import { useAuthStore } from '@/shared/store';
import styles from './edit-profile.module.scss';

export const EditProfileComponent: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid },
    getValues,
    reset,
  } = useForm<IPersonalInfoData>({
    resolver: yupResolver(schemaUpdateProfile),
    mode: 'onChange',
    defaultValues: {
      email: '',
      fullName: '',
      shippingAddress: '',
      phoneNumber: '',
    },
  });

  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getUserByIdApi,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (user) {
      reset({
        email: user.email || '',
        fullName: user.fullName || '',
        phoneNumber: user.phoneNumber || '',
        shippingAddress: user.shippingAddress || '',
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: IPersonalInfoData) => {
    try {
      const payload: Partial<ICreateUser> = {
        ...data,
      };
      await updateUserApi(payload);
      toast.success('Info changed successfully');
    } catch (error) {
      toast.error(`Error updating user: ${String(error)}`);
    }
  };

  const currentValues = getValues();
  const role = useAuthStore.getState().role;
  return (
    <Wrapper>
      <form className={styles.editForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.header}>
          <BackButton /> <Title title="Edit personal information"></Title>
        </div>

        <Input
          control={control}
          name="email"
          label="Email"
          defaultValue={currentValues.email}
        />
        <Input
          control={control}
          name="fullName"
          label={role === Role.CLIENT ? 'Full name' : 'Business name'}
          defaultValue={currentValues.fullName}
        />
        <Input
          control={control}
          name="phoneNumber"
          label="Phone number"
          defaultValue={currentValues.phoneNumber}
        />
        <Input
          control={control}
          name="shippingAddress"
          label="Shipping address"
          defaultValue={currentValues.shippingAddress}
        />
        <Button btnType="submit" color="dark" disabled={!isDirty || !isValid}>
          {isLoading ? <Loader /> : 'Save'}
        </Button>
      </form>
    </Wrapper>
  );
};
