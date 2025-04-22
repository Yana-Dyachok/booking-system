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
const enum Role {
  CLIENT,
  BUSINESS,
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
