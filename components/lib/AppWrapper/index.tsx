import { ConnectionProvider } from '@solana/wallet-adapter-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import config from '../../../config';

export const queryClient = new QueryClient();

const WalletProvider = dynamic(() => import('./WalletProvider'), {
  ssr: false,
});

interface Props {
  children: React.ReactNode;
}

const AppWrapper = ({ children }: Props) => (
  <QueryClientProvider client={queryClient}>
    <ConnectionProvider endpoint={config.solanaEndpoint}>
      <WalletProvider>{children}</WalletProvider>
    </ConnectionProvider>
  </QueryClientProvider>
);

export default AppWrapper;
