import { memo, useMemo } from 'react';
import { Transaction } from '../../../lib/types';
import BalancesPresentational from './BalancesPresentational';
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
