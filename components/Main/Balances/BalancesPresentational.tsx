import { memo } from 'react';
import config from '../../../config';
import { Balance } from '../../../lib/types';
import BalanceRow from './BalanceRow';

interface Props {
  balances: Balance[];
}

const Balances = memo(({ balances }: Props) => (
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
));

export default Balances;
