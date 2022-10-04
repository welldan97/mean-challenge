import { memo, useMemo } from 'react';
import groupBy from 'lodash/fp/groupBy';
import times from 'lodash/fp/times';
import { DateTime } from 'luxon';
import { Transaction } from '../../../lib/Transaction';

interface Balance {
  dateTime: DateTime;
  averageBalance: number;
  transactionsCount: number;
}

interface BalanceRowProps {
  balance: Balance;
}

const BalanceRow = memo(({ balance }: BalanceRowProps) => (
  <tr>
    <td>
      {new Intl.DateTimeFormat('pt-PT', {
        dateStyle: 'short',
        timeStyle: 'short',
      }).format(balance.dateTime.toJSDate())}
    </td>
    <td>{balance.averageBalance / 1000000000}</td>
    <td>{balance.transactionsCount}</td>
  </tr>
));

interface Props {
  transactions: Transaction[];
}

const Balances = memo(({ transactions }: Props) => {
  const balances = useMemo(() => {
    const groupedByDate = groupBy(
      t =>
        DateTime.fromMillis(t.timestamp * 1000)
          .startOf('hour')
          .toMillis(),
      transactions,
    );
    return times(
      n => DateTime.now().startOf('hour').minus({ hour: n }),
      24,
    ).map(h => {
      const transactions = groupedByDate[h.toMillis().toString()];

      return {
        dateTime: h,
        averageBalance: transactions
          ? transactions.reduce((acc, t) => acc + t.amount, 0) /
            transactions.length
          : 0,
        transactionsCount: transactions?.length ?? 0,
      };
    });
  }, [transactions]);
  return (
    <div className="w-[800px]">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Time</th>
            <th>Average Balance</th>
            <th>Transactions Count</th>
          </tr>
        </thead>
        <tbody>
          {balances.map(b => (
            <BalanceRow key={b.dateTime.toMillis()} balance={b} />
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default Balances;
