import { memo } from 'react';
import dynamic from 'next/dynamic';

// use dynamic import to mock in tests
const WalletMultiButton = dynamic(() => import('./WalletMultiButtonBridge'), {
  ssr: false,
});

const Header = memo(() => (
  <header className="sticky justify-end items-center top-0 z-30 flex w-full text-base-content shadow-sm bg-base-300">
    <h1 className="flex-1 p-4 text-l font-bold">Solana Balance</h1>
    <div className="mr-16">
      <WalletMultiButton className="btn" />
    </div>
  </header>
));

export default Header;
