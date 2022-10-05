import { memo, useMemo } from 'react';
import { Transaction } from '../../../lib/Transaction';
import BalancesPresentational from './BalancesPresentational.tsx';
import transactionsToBalances from './transactionsToBalances';

interface Props {
  transactions: Transaction[];
}

const Balances = memo(({ transactions }: Props) => {
  const balances = useMemo(
    () => transactionsToBalances(transactions),
    [transactions],
  );

  return <BalancesPresentational balances={balances} />;
});

export default Balances;
