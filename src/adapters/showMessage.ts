import { toast } from 'react-toastify';
import Dialog from '../components/Dialog';

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
  confirm: (data: string, onClosing: (confirmed: boolean) => void) => {
    toast(Dialog, {
      data,
      autoClose: false,
      closeOnClick: false,
      closeButton: false,
      draggable: false,
      onClose: (confirmed) => {
        return onClosing(confirmed as boolean);
      },
    });
  },
};