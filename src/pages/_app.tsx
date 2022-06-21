import '@/styles/globals.css';
import '@/styles/default.css';
import '@/styles/flaticon.css';
import '@/styles/fontAwesome5Pro.css';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import 'react-responsive-modal/styles.css';
import './index.scss';

import axios from 'axios';
import { AnimatePresence } from 'framer-motion';
import type { AppProps } from 'next/app';
import { ThemeProvider, useTheme } from 'next-themes';
import { Provider } from 'react-redux';
import { Theme, ToastContainer } from 'react-toastify';
import { SWRConfig } from 'swr';

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

  if (Authorization) {
    axios.defaults.headers.common['Authorization'] = Authorization;
  }

  return (
    <Provider store={store}>
      <ThemeProvider
        defaultTheme='light'
        enableSystem={false}
        attribute='class'
      >
        <SWRConfig
          value={{
            fetcher: (url) =>
              axios
                .get(url, {
                  headers: {
                    Authorization: getAuthHeader() ?? Authorization ?? '',
                  },
                })
                .then((res) => res.data),
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
