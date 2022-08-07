/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast, ToastContentProps } from 'react-toastify';

export const toastPromiseError = (fn?: () => any, defaultRes?: string) => {
  return (e: ToastContentProps<any>) => {
    fn?.();
    const [returnMessage, ...messages] = e.data.response.data
      .message as string[];
    messages.forEach((message) => {
      console.log('worrr');
      toast.error(message, { toastId: message });
    });
    return returnMessage || defaultRes || 'Error';
  };
};

export default toastPromiseError;
