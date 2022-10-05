import { render } from '@testing-library/react';

import transactions from '../../../lib/test/fixtures/transactions';
import Transactions from '.';

describe('Transactions', () => {
  test('render', () => {
    const { container } = render(<Transactions transactions={transactions} />);

    expect(container).toMatchSnapshot();
  });
});
