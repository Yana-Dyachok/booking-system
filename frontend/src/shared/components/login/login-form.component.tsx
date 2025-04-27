'use client';
import React from 'react';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { ILoginResponse, ILoginData } from '@/shared/types/auth.types';
import { Button } from '@/shared/ui/button/button.component';
import { schemaLogin } from '@/utils/validation.schema';
import { Input } from '@/shared/ui/input';
import { useAuthStore } from '../../store/use-auth.store';
import { loginUserApi } from '@/api/auth.api';
import { Loader } from '@/shared/ui/loader/loader.component';
import { Title } from '@/shared/ui/title/title.component';
import { AskQuestion } from '@/shared/ui/ask-question/ask-question.component';
import { Wrapper } from '@/shared/ui/wrapper/wrapper.component';
import styles from './login-form.module.scss';

export const LoginForm: React.FC = () => {
  const { control, handleSubmit } = useForm<ILoginData>({
    resolver: yupResolver(schemaLogin),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const router = useRouter();
  const { setAuthToken, setRefreshToken, setRole } = useAuthStore();

  const {
    mutate,
    status,
  }: UseMutationResult<
    ILoginResponse,
    AxiosError<{ message?: string }>,
    ILoginData
  > = useMutation({
    mutationFn: async (data: ILoginData): Promise<ILoginResponse> => {
      return await loginUserApi(data);
    },
    onSuccess: (data): void => {
      setAuthToken(data.accessToken);
      setRefreshToken(data.refreshToken);
      setRole(data.role);
      router.push('./');
    },
    onError: (error: AxiosError<{ message?: string }>): void => {
      if (error?.response?.data?.message === 'Please verify your email first') {
        toast.error('Please verify your email address before logging in.');
      } else {
        toast.error('Incorrect Email or Password');
      }
    },
  });

  const isLoading = status === 'pending';

  const onSubmit = (data: ILoginData): void => {
    mutate(data);
  };

  return (
    <Wrapper>
      <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
        <Title title="Log in" />
        <Input control={control} name="email" label="Email" defaultValue="" />
        <Input
          control={control}
          name="password"
          label="Password"
          defaultValue=""
          toggleShowPassword={true}
        />
        <AskQuestion
          text="Don’t have an account?"
          link="/register"
          linkText="Sign up"
        />
        <Button btnType="submit" color="light" disabled={isLoading}>
          {isLoading ? <Loader /> : 'Log in'}
        </Button>
      </form>
    </Wrapper>
  );
};
