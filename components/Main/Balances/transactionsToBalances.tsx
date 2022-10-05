import groupBy from 'lodash/fp/groupBy';
import maxBy from 'lodash/fp/maxBy';
import minBy from 'lodash/fp/minBy';
import sortBy from 'lodash/fp/sortBy';
import times from 'lodash/fp/times';
import { DateTime, Interval } from 'luxon';

import config from '../../../config';
import { Transaction, Balance } from '../../../lib/types';

const getTransactionsHourInterval = (transactions: Transaction[]) => {
  const startOfHour = DateTime.fromMillis(
    transactions[0].timestamp * 1000,
  ).startOf('hour');

  return Interval.fromDateTimes(startOfHour, startOfHour.endOf('hour'));
};

const getDurationsPerHour = (transactions: Transaction[]) => {
  const interval = getTransactionsHourInterval(transactions);
  return interval
    .splitAt(...transactions.map(t => DateTime.fromMillis(t.timestamp * 1000)))
    .map(i => i.toDuration().as('milliseconds'));
};

const getBalancesPerHour = (transactions: Transaction[]) => [
  transactions[0].balanceBefore,
  ...transactions.map(t => t.balanceAfter),
];

const accumulatedBalances = (durations: number[], balances: number[]) =>
  durations.reduce((acc, duration, index) => {
    const balance = balances[index];
    return acc + duration * balance;
  }, 0);

const calculateAverageBalance = (transactions: Transaction[]) => {
  const totalDuration = getTransactionsHourInterval(transactions)
    .toDuration()
    .as('milliseconds');
  const durations = getDurationsPerHour(transactions);
  const balances = getBalancesPerHour(transactions);

  return accumulatedBalances(durations, balances) / totalDuration;
};

const balancesGroupedByHour = (transactions: Transaction[]) => {
  const groupedByHour = groupBy<Transaction>(
    t =>
      DateTime.fromMillis(t.timestamp * 1000)
        .startOf('hour')
        .toMillis(),
    sortBy(t => t.timestamp, transactions),
  );
  const hours = times(
    n => DateTime.now().startOf('hour').minus({ hour: n }),
    config.hours,
  );

  return hours.map(h => {
    const transactionsGroup = groupedByHour[h.toMillis().toString()] || [];
    return [h, transactionsGroup] as [DateTime, Transaction[]];
  });
};

const latestBalance = (transactions: Transaction[]) =>
  maxBy(t => t.timestamp, transactions)?.balanceAfter || 0;

const earliestBalance = (transactions: Transaction[]) =>
  minBy(t => t.timestamp, transactions)?.balanceBefore;

const transactionsToBalances = (transactions: Transaction[]) => {
  let lastBalance = latestBalance(transactions);

  return balancesGroupedByHour(transactions).map(
    ([dateTime, transactionsGroup]) => {
      const averageBalance = transactionsGroup.length
        ? calculateAverageBalance(transactionsGroup)
        : lastBalance;

      lastBalance = earliestBalance(transactionsGroup) ?? lastBalance;

      return {
        dateTime,
        averageBalance,
        transactionsCount: transactionsGroup.length,
      };
    },
  ) as Balance[];
};

export default transactionsToBalances;
