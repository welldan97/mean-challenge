import { memo } from 'react';
import { Transaction } from '../../../lib/Transaction';

interface TransactionRowProps {
  transaction: Transaction;
}

const TransactionRow = memo(({ transaction }: TransactionRowProps) => (
  <tr>
    <td>
      {new Intl.DateTimeFormat('pt-PT', {
        dateStyle: 'short',
        timeStyle: 'short',
      }).format(new Date(transaction.timestamp * 1000))}
    </td>
    <td>{transaction.timestamp}</td>
    <td className="truncate max-w-[100px]">{transaction.from}</td>
    <td className="truncate max-w-[100px]">{transaction.to}</td>
    <td>{transaction.amount / 1000000000}</td>
    <td>{transaction.fromBalance}</td>
    <td>{transaction.toBalance}</td>
  </tr>
));

interface Props {
  transactions: Transaction[];
}

const Transactions = memo(({ transactions }: Props) => (
  <div className="w-[800px]">
    <table className="table table-zebra w-full">
      <thead>
        <tr>
          <th>Time</th>
          <th>Timestamp</th>
          <th>From</th>
          <th>To</th>
          <th>Amount</th>
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
