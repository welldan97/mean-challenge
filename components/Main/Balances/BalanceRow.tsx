import { memo } from 'react';
import config from '../../../config';
import { Balance } from './types';

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

export default BalanceRow;
