import '@/styles/globals.css';

import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import NextNProgress from 'nextjs-progressbar';

import ScrollButton from '@/components/ScrollButton';
declare module 'next-themes' {
  interface ThemeProviderProps {
    children: React.ReactNode;
  }
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider attribute='class' defaultTheme='light' enableSystem={false}>
      <NextNProgress
        color='#b39c78'
        startPosition={0.2}
        options={{ showSpinner: false }}
      />
      <Component {...pageProps} />
      <ScrollButton />
    </ThemeProvider>
  );
};

export default MyApp;
