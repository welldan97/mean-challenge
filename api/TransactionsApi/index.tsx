import { Connection, PublicKey } from '@solana/web3.js';

import config from '../../config';
import { Transaction } from '../../lib/Transaction';
import parseTransaction from './parseTransaction';
import { fetchSignatures, fetchTransactions } from './utils';

const TransactionsApi = {
  async index(
    connection: Connection,
    publicKey: PublicKey,
    before?: string,
  ): Promise<Transaction[]> {
    const signatures = await fetchSignatures(connection, publicKey, before);

    // No signatures - don't fetch transactions
    if (!signatures.length) return [];

    const transactions = await fetchTransactions(
      connection,
      publicKey,
      signatures,
    );

    // Reached the end - return fetched transactions
    if (signatures.length < config.signaturesLimit) return transactions;

    // Fetch more transactions recursively
    const nextTransactions = await TransactionsApi.index(
      connection,
      publicKey,
      signatures[signatures.length - 1],
    );

    return [...transactions, ...nextTransactions];
  },

  async getBySignature(
    connection: Connection,
    publicKey: PublicKey,
    signature: string,
  ) {
    const solanaTransaction = await connection.getParsedTransaction(signature);

    return parseTransaction(solanaTransaction, publicKey);
  },
};

export default TransactionsApi;
