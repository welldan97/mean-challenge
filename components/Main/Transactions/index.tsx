import { memo } from 'react';
import config from '../../../config';
import { Transaction } from '../../../lib/Transaction';
import TransactionRow from './TransactionRow';

interface Props {
  transactions: Transaction[];
}

const Transactions = memo(({ transactions }: Props) => (
  <div className="w-[800px] mb-16">
    <table className="table table-zebra w-full">
      <thead>
        <tr>
          <th />
          <th>Time</th>
          <th>Timestamp</th>
          <th>From</th>
          <th>To</th>
          <th>Amount</th>
          {config.showExtraData && (
            <>
              <th>Balance Before</th>
              <th>Balance After</th>
            </>
          )}
        </tr>
      </thead>
      <tbody>
        {transactions.map(transaction => (
          <TransactionRow
            key={transaction.timestamp}
            transaction={transaction}
          />
        ))}
      </tbody>
    </table>
  </div>
));

export default Transactions;
