import { Role } from './types';
export interface IRegisterData {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  shippingAddress: string;
  phoneNumber: string;
  role: Role;
  description?: string;
}

export interface IRegisterResponse
  extends Omit<IRegisterData, 'confirmPassword'> {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface IChangePassword {
  currentPassword: string;
  newPassword: string;
}

export interface IVallidPassword extends IChangePassword {
  confirmPassword: string;
}

export interface IUser {
  email: string;
  password: string;
  fullName: string;
  shippingAddress: string;
  phoneNumber: string;
}

export interface ICreateUser {
  email: string;
  password: string;
  fullName: string;
  shippingAddress: string;
  phoneNumber: string;
}

export interface IPersonalInfoData extends Omit<IUser, 'password'> {
  email: string;
  fullName: string;
  shippingAddress: string;
  phoneNumber: string;
}

export interface IChangePassword {
  currentPassword: string;
  newPassword: string;
}

export interface IVallidPassword extends IChangePassword {
  confirmPassword: string;
}
