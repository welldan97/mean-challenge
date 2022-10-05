import type { WalletProviderProps } from '@solana/wallet-adapter-react';
import { WalletProvider as BaseWalletProvider } from '@solana/wallet-adapter-react';

import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { useMemo } from 'react';

import '@solana/wallet-adapter-react-ui/styles.css';

export function WalletProvider(props: Omit<WalletProviderProps, 'wallets'>) {
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  return (
    <BaseWalletProvider wallets={wallets} {...props}>
      <WalletModalProvider {...props} />
    </BaseWalletProvider>
  );
}

export default WalletProvider;
