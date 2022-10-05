import { Connection, PublicKey } from '@solana/web3.js';
import { DateTime } from 'luxon';

import config from '../../config';
import { Transaction } from '../../lib/Transaction';
import parseTransaction from './parseTransaction';

export const fetchSignatures = async (
  connection: Connection,
  publicKey: PublicKey,
  before?: string,
) => {
  const signatures = await connection.getSignaturesForAddress(publicKey, {
    limit: config.signaturesLimit,
    before,
  });

  // Filter out transactions older than 24 hours
  return signatures
    .filter(
      s =>
        (s.blockTime || 0) * 1000 >=
        DateTime.now().minus({ hour: config.hours }).toMillis(),
    )
    .map(s => s.signature);
};

export const fetchTransactions = async (
  connection: Connection,
  publicKey: PublicKey,
  signatures: string[],
) => {
  const solanaTransactions = await connection.getParsedTransactions(signatures);

  return solanaTransactions
    .map(t => parseTransaction(t, publicKey))
    .filter(e => e !== undefined) as Transaction[];
};
