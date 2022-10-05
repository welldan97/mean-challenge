import { memo, useMemo } from 'react';
import groupBy from 'lodash/fp/groupBy';
import maxBy from 'lodash/fp/maxBy';
import minBy from 'lodash/fp/minBy';
import sortBy from 'lodash/fp/sortBy';
import times from 'lodash/fp/times';
import { DateTime, Interval } from 'luxon';
import { Transaction } from '../../../lib/Transaction';
import config from '../../../config';

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
    {config.showExtraData && <td>{balance.transactionsCount}</td>}
  </tr>
));

interface Props {
  transactions: Transaction[];
}

const calculateAverageBalance = (transactions: Transaction[]) => {
  const startOfHour = DateTime.fromMillis(
    transactions[0].timestamp * 1000,
  ).startOf('hour');

  const interval = Interval.fromDateTimes(
    startOfHour,
    startOfHour.endOf('hour'),
  );

  const durations = interval
    .splitAt(...transactions.map(t => DateTime.fromMillis(t.timestamp * 1000)))
    .map(i => i.toDuration().as('milliseconds'));

  const balances = [
    transactions[0].balanceBefore,
    ...transactions.map(t => t.balanceAfter),
  ];

  const average =
    durations.reduce((acc, duration, index) => {
      const balance = balances[index];
      return acc + duration * balance;
    }, 0) / interval.toDuration().as('milliseconds');
  return average;
};

const Balances = memo(({ transactions }: Props) => {
  const balances = useMemo(() => {
    const groupedByDate = groupBy(
      t =>
        DateTime.fromMillis(t.timestamp * 1000)
          .startOf('hour')
          .toMillis(),
      sortBy(t => Number(t.timestamp), transactions),
    );

    let balanceBefore =
      maxBy(t => t.timestamp, transactions)?.balanceAfter || 0;
    const hours = times(
      n => DateTime.now().startOf('hour').minus({ hour: n }),
      config.hours,
    );

    return hours.map(h => {
      const transactionsGroup = groupedByDate[h.toMillis().toString()];

      if (!transactionsGroup) {
        return {
          dateTime: h,
          averageBalance: balanceBefore,
          transactionsCount: 0,
        };
      }
      balanceBefore = minBy(t => t.timestamp, transactionsGroup).balanceBefore;

      return {
        dateTime: h,
        averageBalance: calculateAverageBalance(transactionsGroup),
        transactionsCount: transactionsGroup.length,
      };
    });
  }, [transactions]);

  return (
    <div className="w-[400px]">
      <table className="table table-zebra w-full mb-16">
        <thead>
          <tr>
            <th>Time</th>
            <th>Average Balance</th>
            {config.showExtraData && <th>Transactions Count</th>}
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
