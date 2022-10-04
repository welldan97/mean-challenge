import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConnectionProvider } from '@solana/wallet-adapter-react';
import dynamic from 'next/dynamic';

export const queryClient = new QueryClient();

const WalletProvider = dynamic(
  () => import('../components/lib/AppWrapper/WalletProvider'),
  {
    ssr: false,
  },
);

// const endpoint = 'https://explorer-api.devnet.solana.com';
const endpoint = 'https://api.devnet.solana.com';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <QueryClientProvider client={queryClient}>
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider>
        <Component {...pageProps} />
      </WalletProvider>
    </ConnectionProvider>
  </QueryClientProvider>
);

export default MyApp;
