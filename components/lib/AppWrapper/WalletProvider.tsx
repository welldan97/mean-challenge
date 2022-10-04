import type { WalletProviderProps } from '@solana/wallet-adapter-react';
import { WalletProvider as BaseWalletProvider } from '@solana/wallet-adapter-react';

import {
  //  getPhantomWallet,
  PhantomWalletAdapter,
  // getLedgerWallet,
  // getMathWallet,
  // getSolflareWallet,
  // getSolletWallet,
  // getSolongWallet,
} from '@solana/wallet-adapter-wallets';
import { useMemo } from 'react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';

import '@solana/wallet-adapter-react-ui/styles.css';

export function WalletProvider(
  props: Omit<WalletProviderProps, 'wallets'>,
): JSX.Element {
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      // getPhantomWallet(),
      // getSolflareWallet(),
      // getTorusWallet({
      //   options: {
      //     // TODO: Get your own tor.us wallet client Id
      //     clientId:
      //       "BOM5Cl7PXgE9Ylq1Z1tqzhpydY0RVr8k90QQ85N7AKI5QGSrr9iDC-3rvmy0K_hF0JfpLMiXoDhta68JwcxS1LQ",
      //   },
      // }),
      // getLedgerWallet(),
      // getSolongWallet(),
      // getMathWallet(),
      // getSolletWallet(),
    ],
    [],
  );

  return (
    <BaseWalletProvider wallets={wallets} {...props}>
      <WalletModalProvider {...props} />
    </BaseWalletProvider>
  );
}

export default WalletProvider;
