import classNames from 'classnames';
import { memo, useState } from 'react';
import useWalletData from '../lib/hooks/useWalletData';
import Balances from './Balances';
import Header from './Header';
import Transactions from './Transactions';

const Main = memo(() => {
  const { transactions } = useWalletData();
  const [page, setPage] = useState<'transactions' | 'balances'>('transactions');

  return (
    <div>
      <Header />
      <main className="flex flex-col items-center">
        <div className="btn-group my-16">
          <button
            className={classNames(
              'btn',
              page === 'transactions' && 'btn-active',
            )}
            type="button"
            onClick={() => setPage('transactions')}
          >
            Transactions
          </button>
          <button
            className={classNames('btn', page === 'balances' && 'btn-active')}
            type="button"
            onClick={() => setPage('balances')}
          >
            Balances
          </button>
        </div>
        {page === 'transactions' && (
          <Transactions transactions={transactions} />
        )}
        {page === 'balances' && <Balances transactions={transactions} />}
      </main>
    </div>
  );
});

export default Main;
