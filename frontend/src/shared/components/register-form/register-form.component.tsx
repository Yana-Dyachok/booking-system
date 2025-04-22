'use client';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { IRegisterData, IRegisterResponse, Role } from '@/shared/types';
import { schemaRegister } from '@/utils';
import { registerUserApi } from '@/api/auth.api';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button/button.component';
import { Title } from '@/shared/ui/title';
import { AskQuestion } from '@/shared/ui/ask-question/ask-question.component';
import { Loader } from '@/shared/ui/loader';
import { Wrapper } from '@/shared/ui/wrapper';
import styles from '../login/login-form.module.scss';

export const RegisterForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm<IRegisterData>({
    resolver: yupResolver(schemaRegister),
    mode: 'onChange',
    defaultValues: {
      email: '',
      fullName: '',
      shippingAddress: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      role: Role.CLIENT,
    },
  });

  const { mutate: registerUser, isPending } = useMutation<
    IRegisterResponse,
    AxiosError,
    IRegisterData
  >({
    mutationFn: async (data: IRegisterData): Promise<IRegisterResponse> => {
      return await registerUserApi(data);
    },
    onSuccess: () => {
      toast.success('User created.');
    },
    onError: (error: AxiosError): void => {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data.message || 'Something went wrong.');
    },
  });

  const onSubmit = (data: IRegisterData) => {
    registerUser(data);
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
        <Title title="Sign up" />

        <Input control={control} name="email" label="Email" defaultValue="" />
        <Input
          control={control}
          name="fullName"
          label="Full name"
          defaultValue=""
        />
        <Input
          control={control}
          name="phoneNumber"
          label="Phone number"
          defaultValue=""
        />
        <Input
          control={control}
          name="shippingAddress"
          label="Shipping address"
          defaultValue=""
        />
        <Input
          control={control}
          name="password"
          label="Password"
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
        <div>
          <label>Select role:</label>
          <Controller
            control={control}
            name="role"
            render={({ field }) => (
              <>
                <label>
                  <input
                    type="radio"
                    value={Role.CLIENT}
                    checked={field.value === Role.CLIENT}
                    onChange={field.onChange}
                  />
                  Client
                </label>
                <label style={{ marginLeft: '1rem' }}>
                  <input
                    type="radio"
                    value={Role.BUSINESS}
                    checked={field.value === Role.BUSINESS}
                    onChange={field.onChange}
                  />
                  Business
                </label>
              </>
            )}
          />
        </div>

        <AskQuestion
          text="Have you already registered?"
          link="/login"
          linkText="Log in"
        />

        <Button
          btnType="submit"
          color="light"
          disabled={isPending || !isDirty || !isValid}
        >
          {isPending ? <Loader /> : 'Sign up'}
        </Button>
      </form>
    </Wrapper>
  );
};
