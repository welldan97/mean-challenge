/* eslint-disable @typescript-eslint/no-explicit-any */
import TransactionApi from '.';
import signatures from '../../lib/test/fixtures/signatures';
import solanaTransactions from '../../lib/test/fixtures/solanaTransactions';

const createPublicKeyMock = () => ({
  toBase58: jest.fn(() => 'publicKey'),
});

const createConnectionMock = () => ({
  getSignaturesForAddress: jest.fn(() => signatures),
  getParsedTransactions: jest.fn(() => solanaTransactions),
});

describe('TransactionsApi', () => {
  test('index', async () => {
    const publicKey = createPublicKeyMock();
    const connection = createConnectionMock();

    // Note: use real types
    const result = await TransactionApi.index(
      connection as any,
      publicKey as any,
    );

    // Note: better to use toEqual
    expect(result).toMatchSnapshot();
  });
});
