// import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { render } from '@testing-library/react';

import Header from '.';

jest.mock('next/dynamic', () => () => () => <span>WalletMultiButton</span>);

describe('Header', () => {
  test('render', () => {
    const { container } = render(<Header />);
    expect(container).toMatchSnapshot();
  });
});
