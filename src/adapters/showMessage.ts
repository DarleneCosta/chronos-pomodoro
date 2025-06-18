import { toast } from 'react-toastify';

export const showMessage = {
  success: (message: string) => {
    toast.success(message);
  },
  error: (message: string) => {
    toast.error(message);
  },
  warning: (message: string) => {
    toast.warning(message);
  },
  warn: (message: string) => {
    toast.warn(message);
  },
  info: (message: string) => {
    toast.info(message);
  },
  dismiss: () => {
    toast.dismiss();
  },
};