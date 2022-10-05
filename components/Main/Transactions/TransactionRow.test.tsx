import { render } from '@testing-library/react';

import { transaction } from '../../../lib/test/fixtures/transactions';
import TransactionRow from './TransactionRow';

describe('TransactionRow', () => {
  test('render', () => {
    const { container } = render(
      <table>
        <tbody>
          <TransactionRow transaction={transaction} />
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();
  });
});
