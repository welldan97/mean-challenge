import { render } from '@testing-library/react';

import { balance } from '../../../lib/test/fixtures/balances';
import BalanceRow from './BalanceRow';

describe('BalanceRow', () => {
  test('render', () => {
    const { container } = render(
      <table>
        <tbody>
          <BalanceRow balance={balance} />
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();
  });
});
