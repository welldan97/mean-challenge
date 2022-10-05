import { QueryClient } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import AppWrapper from '../components/lib/AppWrapper';
import '../styles/globals.css';

export const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps) => (
  <AppWrapper>
    <Component {...pageProps} />
  </AppWrapper>
);

export default MyApp;
