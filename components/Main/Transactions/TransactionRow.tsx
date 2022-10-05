import classNames from 'classnames';
import { memo } from 'react';
import config from '../../../config';
import { Transaction } from '../../../lib/Transaction';

interface Props {
  transaction: Transaction;
}

const TransactionRow = memo(({ transaction }: Props) => {
  if (transaction.type === 'other' && !config.showExtraData) return null;

  return (
    <tr>
      <td
        className={classNames(
          'font-bold',
          transaction.type === 'send' ? 'text-orange-400' : 'text-blue-200',
        )}
      >
        {transaction.type === 'send' && '⇧'}
        {transaction.type === 'receive' && '⇩'}
        {transaction.type === 'other' && '?'}
      </td>
      <td>
        {new Intl.DateTimeFormat('pt-PT', {
          dateStyle: 'short',
          timeStyle: 'short',
        }).format(new Date(transaction.timestamp * 1000))}
      </td>
      <td>{transaction.timestamp}</td>
      <td className="truncate max-w-[100px]">
        {transaction.type === 'send' && transaction.walletAddress}
        {transaction.type === 'receive' && transaction.address}
        {transaction.type === 'other' && transaction.walletAddress}
      </td>
      <td className="truncate max-w-[100px]">
        {transaction.type === 'send' && transaction.address}
        {transaction.type === 'receive' && transaction.walletAddress}
        {transaction.type === 'other' && '-'}
      </td>
      <td>{transaction.type !== 'other' && transaction.amount / 1000000000}</td>
      {config.showExtraData && (
        <>
          <td>{transaction.balanceBefore / 1000000000}</td>
          <td>{transaction.balanceAfter / 1000000000}</td>
        </>
      )}
    </tr>
  );
});

export default TransactionRow;
