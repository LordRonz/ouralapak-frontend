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
import { ThemeProvider } from 'next-themes';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { SWRConfig } from 'swr';

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
  const { Authorization } = useAuthHeader();

  if (Authorization) {
    axios.defaults.headers.common['Authorization'] = Authorization;
  }

  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme='light'>
        <SWRConfig
          value={{
            fetcher: (url) => axios.get(url).then((res) => res.data),
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
      <ToastContainer />
    </Provider>
  );
};

export default MyApp;
