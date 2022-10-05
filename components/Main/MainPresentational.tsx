import classNames from 'classnames';
import { memo } from 'react';

import { Transaction } from '../../lib/Transaction';
import { WalletStatus } from '../types';
import Balances from './Balances';
import Header from './Header';
import Transactions from './Transactions';
import { Page } from './types';

interface Props {
  transactions: Transaction[];
  page: Page;
  status: WalletStatus;
  onChangePage: (page: Page) => void;
}

const Main = memo(({ transactions, page, onChangePage, status }: Props) => (
  <div>
    <Header />
    <main className="flex flex-col items-center py-16">
      {status === 'disconnected' && <h1>Connect your wallet</h1>}
      {status === 'loading' && <h1>Loading...</h1>}
      {status === 'error' && (
        <h1>Oops, there was an error. Please try again</h1>
      )}
      {status === 'success' && !transactions.length && (
        <h1>No transactions found for the last 24 hours</h1>
      )}
      {status === 'success' && !!transactions.length && (
        <>
          <div className="btn-group mb-16">
            <button
              className={classNames(
                'btn',
                page === 'transactions' && 'btn-active',
              )}
              type="button"
              onClick={() => onChangePage('transactions')}
            >
              Transactions
            </button>
            <button
              className={classNames('btn', page === 'balances' && 'btn-active')}
              type="button"
              onClick={() => onChangePage('balances')}
            >
              Balances
            </button>
          </div>
          {page === 'transactions' && (
            <Transactions transactions={transactions} />
          )}
          {page === 'balances' && <Balances transactions={transactions} />}
        </>
      )}
    </main>
  </div>
));

export default Main;
