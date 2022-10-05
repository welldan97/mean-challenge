// import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { render } from '@testing-library/react';
import transactions from '../../lib/test/fixtures/transactions';
import MainPresentational from './MainPresentational';

jest.mock('next/dynamic', () => () => () => <span>WalletMultiButton</span>);

describe('MainPresentational', () => {
  test('render', () => {
    const { container } = render(
      <MainPresentational
        transactions={transactions}
        page="transactions"
        status="success"
        onChangePage={() => {}}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
