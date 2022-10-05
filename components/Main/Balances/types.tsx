import { DateTime } from 'luxon';

export interface Balance {
  dateTime: DateTime;
  averageBalance: number;
  transactionsCount: number;
}
