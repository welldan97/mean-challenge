import { render } from '@testing-library/react';

import transactions from '../../../lib/test/fixtures/transactions';
import Balances from '.';

describe('Transactions', () => {
  test('render', () => {
    const { container } = render(<Balances transactions={transactions} />);

    expect(container).toMatchSnapshot();
  });
});
