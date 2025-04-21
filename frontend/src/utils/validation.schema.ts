import * as yup from 'yup';

const emailValidationSchema = (): yup.StringSchema<string> =>
  yup
    .string()
    .strict()
    .trim()
    .required('email is required')
    .test(
      'not-empty',
      'email cannot be empty or only spaces',
      (value) => value?.trim().length !== 0,
    )
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'email must be a valid email address (e.g., user@example.com)',
    )
    .max(255, 'email cannot be longer than 255 characters')
    .defined();

const passwordValidationSchema = (): yup.StringSchema<string> =>
  yup
    .string()
    .strict()
    .trim()
    .required('password is required')
    .min(6, 'password must be at least 8 characters long')
    .matches(/[A-Z]/, 'password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'password must contain at least one number')
    .matches(
      /[@$!%*?&]/,
      'password must contain at least one special character (@, $, !, %, *, ?, &)',
    )
    .max(255, 'password cannot be longer than 255 characters')
    .defined();

export const createNameValidationSchema = () =>
  yup
    .string()
    .required('Name is required')
    .matches(
      /^[a-zA-Zа-яА-ЯёЁіІїЇєЄ\s']+$/,
      'Name can only contain letters, spaces, and apostrophes',
    )
    .min(2, 'Name must be at least 2 characters long')
    .max(50, 'Name cannot be longer than 50 characters')
    .test(
      'is-capitalized',
      'Each part of the name must start with a capital letter',
      (value) => {
        if (!value) return false;
        const nameParts = value.split(' ');
        return nameParts.every(
          (part) => part.charAt(0) === part.charAt(0).toUpperCase(),
        );
      },
    );
export const createPhoneNumberValidationSchema = () =>
  yup
    .string()
    .required('Phone number is required')
    .matches(
      /^(\+?\d{1,4})?(\s|\-)?\(?\d{1,4}\)?(\s|\-)?\d{1,4}(\s|\-)?\d{1,4}$/,
      'Invalid phone number format',
    )
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number cannot be longer than 15 digits');

export const createAddressValidationSchema = () =>
  yup
    .string()
    .required('Address is required')
    .min(5, 'Address must be at least 5 characters long')
    .max(100, 'Address cannot be longer than 100 characters');

export const schemaLogin: yup.ObjectSchema<{
  email: string;
  password: string;
}> = yup.object().shape({
  email: emailValidationSchema(),
  password: passwordValidationSchema(),
});

export const schemaRegister: yup.ObjectSchema<{
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  shippingAddress: string;
  phoneNumber: string;
}> = yup.object().shape({
  email: emailValidationSchema(),
  password: passwordValidationSchema(),
  fullName: createNameValidationSchema(),
  shippingAddress: createAddressValidationSchema(),
  phoneNumber: createPhoneNumberValidationSchema(),
  confirmPassword: yup
    .string()
    .required('Password confirmation is required')
    .oneOf([yup.ref('password')], 'Passwords don`t match'),
});

export const schemaUpdateProfile: yup.ObjectSchema<{
  email: string;
  fullName: string;
  shippingAddress: string;
  phoneNumber: string;
}> = yup.object().shape({
  email: emailValidationSchema(),
  fullName: createNameValidationSchema(),
  shippingAddress: createAddressValidationSchema(),
  phoneNumber: createPhoneNumberValidationSchema(),
});

export const schemaChangePassword: yup.ObjectSchema<{
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}> = yup.object().shape({
  currentPassword: yup.string().required('Current password is required'),
  newPassword: passwordValidationSchema(),
  confirmPassword: yup
    .string()
    .required('Password confirmation is required')
    .oneOf([yup.ref('newPassword')], 'Passwords don`t match'),
});
