import { render } from '@testing-library/react';

import balances from '../../../lib/test/fixtures/balances';
import BalancesPresentational from './BalancesPresentational';

describe('BalancesPresentational', () => {
  test('render', () => {
    const { container } = render(
      <BalancesPresentational balances={balances} />,
    );

    expect(container).toMatchSnapshot();
  });
});
