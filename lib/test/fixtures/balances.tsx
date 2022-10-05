import { DateTime } from 'luxon';
import { Balance } from '../../types';

const balances = [
  {
    dateTime: DateTime.fromISO('2022-10-05T21:00:00.000+01:00'),
    averageBalance: 3549467160,
    transactionsCount: 0,
  },
  {
    dateTime: DateTime.fromISO('2022-10-05T20:00:00.000+01:00'),
    averageBalance: 3549467160,
    transactionsCount: 0,
  },
  {
    dateTime: DateTime.fromISO('2022-10-05T19:00:00.000+01:00'),
    averageBalance: 3549467160,
    transactionsCount: 0,
  },
  {
    dateTime: DateTime.fromISO('2022-10-05T18:00:00.000+01:00'),
    averageBalance: 3549467160,
    transactionsCount: 0,
  },
  {
    dateTime: DateTime.fromISO('2022-10-05T17:00:00.000+01:00'),
    averageBalance: 3560768575.639282,
    transactionsCount: 1,
  },
  {
    dateTime: DateTime.fromISO('2022-10-05T16:00:00.000+01:00'),
    averageBalance: 3597715202.567512,
    transactionsCount: 2,
  },
  {
    dateTime: DateTime.fromISO('2022-10-05T15:00:00.000+01:00'),
    averageBalance: 3649482160,
    transactionsCount: 0,
  },
  {
    dateTime: DateTime.fromISO('2022-10-05T14:00:00.000+01:00'),
    averageBalance: 3691672535.6084375,
    transactionsCount: 2,
  },
  {
    dateTime: DateTime.fromISO('2022-10-05T13:00:00.000+01:00'),
    averageBalance: 4693386241.637245,
    transactionsCount: 1,
  },
  {
    dateTime: DateTime.fromISO('2022-10-05T12:00:00.000+01:00'),
    averageBalance: 4709497160,
    transactionsCount: 0,
  },
  {
    dateTime: DateTime.fromISO('2022-10-05T11:00:00.000+01:00'),
    averageBalance: 4709497160,
    transactionsCount: 0,
  },
  {
    dateTime: DateTime.fromISO('2022-10-05T10:00:00.000+01:00'),
    averageBalance: 4709497160,
    transactionsCount: 0,
  },
  {
    dateTime: DateTime.fromISO('2022-10-05T09:00:00.000+01:00'),
    averageBalance: 4709497160,
    transactionsCount: 0,
  },
  {
    dateTime: DateTime.fromISO('2022-10-05T08:00:00.000+01:00'),
    averageBalance: 4709497160,
    transactionsCount: 0,
  },
  {
    dateTime: DateTime.fromISO('2022-10-05T07:00:00.000+01:00'),
    averageBalance: 4709497160,
    transactionsCount: 0,
  },
  {
    dateTime: DateTime.fromISO('2022-10-05T06:00:00.000+01:00'),
    averageBalance: 4709497160,
    transactionsCount: 0,
  },
  {
    dateTime: DateTime.fromISO('2022-10-05T05:00:00.000+01:00'),
    averageBalance: 4709497160,
    transactionsCount: 0,
  },
  {
    dateTime: DateTime.fromISO('2022-10-05T04:00:00.000+01:00'),
    averageBalance: 4709497160,
    transactionsCount: 0,
  },
  {
    dateTime: DateTime.fromISO('2022-10-05T03:00:00.000+01:00'),
    averageBalance: 4709497160,
    transactionsCount: 0,
  },
  {
    dateTime: DateTime.fromISO('2022-10-05T02:00:00.000+01:00'),
    averageBalance: 4709497160,
    transactionsCount: 0,
  },
  {
    dateTime: DateTime.fromISO('2022-10-05T01:00:00.000+01:00'),
    averageBalance: 4615052689.32098,
    transactionsCount: 1,
  },
  {
    dateTime: DateTime.fromISO('2022-10-05T00:00:00.000+01:00'),
    averageBalance: 2709497160,
    transactionsCount: 0,
  },
  {
    dateTime: DateTime.fromISO('2022-10-04T23:00:00.000+01:00'),
    averageBalance: 2709497160,
    transactionsCount: 0,
  },
  {
    dateTime: DateTime.fromISO('2022-10-04T22:00:00.000+01:00'),
    averageBalance: 2709497160,
    transactionsCount: 0,
  },
  {
    dateTime: DateTime.fromISO('2022-10-04T21:00:00.000+01:00'),
    averageBalance: 2932560376.128671,
    transactionsCount: 4,
  },
  {
    dateTime: DateTime.fromISO('2022-10-04T20:00:00.000+01:00'),
    averageBalance: 2989517160,
    transactionsCount: 0,
  },
  {
    dateTime: DateTime.fromISO('2022-10-04T19:00:00.000+01:00'),
    averageBalance: 3313684997.2688437,
    transactionsCount: 1,
  },
  {
    dateTime: DateTime.fromISO('2022-10-04T18:00:00.000+01:00'),
    averageBalance: 3435355200.5091777,
    transactionsCount: 1,
  },
  {
    dateTime: DateTime.fromISO('2022-10-04T17:00:00.000+01:00'),
    averageBalance: 2989522160,
    transactionsCount: 0,
  },
  {
    dateTime: DateTime.fromISO('2022-10-04T16:00:00.000+01:00'),
    averageBalance: 2989522160,
    transactionsCount: 0,
  },
  {
    dateTime: DateTime.fromISO('2022-10-04T15:00:00.000+01:00'),
    averageBalance: 2989522160,
    transactionsCount: 0,
  },
  {
    dateTime: DateTime.fromISO('2022-10-04T14:00:00.000+01:00'),
    averageBalance: 2989522160,
    transactionsCount: 0,
  },
  {
    dateTime: DateTime.fromISO('2022-10-04T13:00:00.000+01:00'),
    averageBalance: 2989522160,
    transactionsCount: 0,
  },
  {
    dateTime: DateTime.fromISO('2022-10-04T12:00:00.000+01:00'),
    averageBalance: 2989522160,
    transactionsCount: 0,
  },
  {
    dateTime: DateTime.fromISO('2022-10-04T11:00:00.000+01:00'),
    averageBalance: 2989522160,
    transactionsCount: 0,
  },
  {
    dateTime: DateTime.fromISO('2022-10-04T10:00:00.000+01:00'),
    averageBalance: 2989522160,
    transactionsCount: 0,
  },
  {
    dateTime: DateTime.fromISO('2022-10-04T09:00:00.000+01:00'),
    averageBalance: 2989522160,
    transactionsCount: 0,
  },
  {
    dateTime: DateTime.fromISO('2022-10-04T08:00:00.000+01:00'),
    averageBalance: 2989522160,
    transactionsCount: 0,
  },
  {
    dateTime: DateTime.fromISO('2022-10-04T07:00:00.000+01:00'),
    averageBalance: 2989522160,
    transactionsCount: 0,
  },
  {
    dateTime: DateTime.fromISO('2022-10-04T06:00:00.000+01:00'),
    averageBalance: 2989522160,
    transactionsCount: 0,
  },
  {
    dateTime: DateTime.fromISO('2022-10-04T05:00:00.000+01:00'),
    averageBalance: 2989522160,
    transactionsCount: 0,
  },
  {
    dateTime: DateTime.fromISO('2022-10-04T04:00:00.000+01:00'),
    averageBalance: 2989522160,
    transactionsCount: 0,
  },
  {
    dateTime: DateTime.fromISO('2022-10-04T03:00:00.000+01:00'),
    averageBalance: 2989522160,
    transactionsCount: 0,
  },
  {
    dateTime: DateTime.fromISO('2022-10-04T02:00:00.000+01:00'),
    averageBalance: 2989522160,
    transactionsCount: 0,
  },
  {
    dateTime: DateTime.fromISO('2022-10-04T01:00:00.000+01:00'),
    averageBalance: 2989522160,
    transactionsCount: 0,
  },
  {
    dateTime: DateTime.fromISO('2022-10-04T00:00:00.000+01:00'),
    averageBalance: 2989522160,
    transactionsCount: 0,
  },
  {
    dateTime: DateTime.fromISO('2022-10-03T23:00:00.000+01:00'),
    averageBalance: 2989522160,
    transactionsCount: 0,
  },
  {
    dateTime: DateTime.fromISO('2022-10-03T22:00:00.000+01:00'),
    averageBalance: 2989522160,
    transactionsCount: 0,
  },
] as Balance[];

export const balance = balances[0];

export default balances;
