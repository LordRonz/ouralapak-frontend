import '@/styles/globals.css';
import '@/styles/default.css';
import '@/styles/flaticon.css';
import '@/styles/fontAwesome5Pro.css';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import 'react-responsive-modal/styles.css';
import 'react-phone-number-input/style.css';
import '@/styles/index.scss';
import 'react-tippy/dist/tippy.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import '@fontsource/rubik/variable-full.css';

import axios from 'axios';
import { AnimatePresence } from 'framer-motion';
import type { AppProps } from 'next/app';
import { ThemeProvider, useTheme } from 'next-themes';
import { Provider } from 'react-redux';
import { Theme, ToastContainer } from 'react-toastify';
import { SWRConfig } from 'swr';

import customAxios from '@/lib/customAxios';
import getAuthHeader from '@/lib/getAuthHeader';
import getFromLocalStorage from '@/lib/getFromLocalStorage';
import { store } from '@/redux/store';
import useAuthHeader from '@/services/authHeader';
declare module 'next-themes' {
  interface ThemeProviderProps {
    children: React.ReactNode;
  }
}

if (typeof window !== 'undefined') {
  require('bootstrap/dist/js/bootstrap');
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { theme } = useTheme();
  const { Authorization } = useAuthHeader();

  axios.defaults.headers.common['Authorization'] =
    getAuthHeader() ?? Authorization ?? '';

  return (
    <Provider store={store}>
      <ThemeProvider
        defaultTheme='light'
        enableSystem={false}
        attribute='class'
      >
        <SWRConfig
          value={{
            fetcher: async (url) => {
              const headers = {
                Authorization: getAuthHeader() ?? Authorization ?? '',
              };
              const res = await customAxios.get(url, {
                headers,
              });
              return res.data;
            },
          }}
        >
          <AnimatePresence
            exitBeforeEnter
            initial={false}
            onExitComplete={() => window.scrollTo(0, 0)}
          >
            <Component {...pageProps} />
          </AnimatePresence>
        </SWRConfig>
      </ThemeProvider>
      <ToastContainer
        theme={(getFromLocalStorage('theme') as Theme) ?? theme ?? 'light'}
      />
    </Provider>
  );
};

export default MyApp;
