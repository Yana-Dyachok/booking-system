import { ToastContainer } from 'react-toastify';
import { toastProps } from './toast-style-props';

export const Toast = () => {
  return <ToastContainer {...toastProps} />;
};
