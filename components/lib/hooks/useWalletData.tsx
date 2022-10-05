import {
  ParsedTransactionWithMeta,
  Connection,
  PublicKey,
} from '@solana/web3.js';

import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { DateTime } from 'luxon';
import { Transaction } from '../../../lib/Transaction';
import config from '../../../config';

const endpoint = 'https://api.devnet.solana.com';
const connection = new Connection(endpoint, 'confirmed');

type Info = {
  destination: string;
  lamports: number;
  source: string;
};

const solanaTransactionToTransaction = (
  solanaTransaction: ParsedTransactionWithMeta | null,
  publicKey: PublicKey,
) => {
  if (!solanaTransaction) return undefined;
  if (!solanaTransaction.meta) return undefined;

  const { fee } = solanaTransaction.meta;
  const postBalances = solanaTransaction.meta.postBalances.slice(0, 2);
  const preBalances = solanaTransaction.meta.preBalances.slice(0, 2);
  const timestamp = solanaTransaction.blockTime;

  const instruction = solanaTransaction.transaction.message.instructions[0];

  if (!('parsed' in instruction) || instruction.parsed?.type !== 'transfer')
    return {
      type: 'other',
      walletAddress: publicKey.toBase58(),
      timestamp,
      fee,
      balanceBefore: preBalances[0],
      balanceAfter: postBalances[0],
    } as Transaction;

  const info = instruction.parsed.info as Info;

  const { destination, lamports: amount, source } = info;
  const type = publicKey.toBase58() === source ? 'send' : 'receive';

  return {
    type,
    walletAddress: publicKey.toBase58(),
    address: type === 'send' ? destination : source,
    amount,
    timestamp,
    fee,
    balanceBefore: type === 'send' ? preBalances[0] : preBalances[1],
    balanceAfter: type === 'send' ? postBalances[0] : postBalances[1],
  } as Transaction;
};

const getTransactions = async (
  publicKey: PublicKey,
  before?: string,
): Promise<Transaction[]> => {
  const limit = 1000;
  const signatures = (
    await connection.getSignaturesForAddress(publicKey, {
      limit,
      before,
    })
  ).filter(
    s =>
      (s.blockTime || 0) * 1000 >=
      DateTime.now().minus({ hour: config.hours }).toMillis(),
  );

  if (!signatures.length) return [];

  const solanaTransactions = await connection.getParsedTransactions(
    signatures.map(s => s.signature),
  );

  const nextBefore = signatures[signatures.length - 1].signature;

  const transactions = solanaTransactions
    .map(t => solanaTransactionToTransaction(t, publicKey))
    .filter(e => e !== undefined) as Transaction[];

  if (signatures.length < limit) return transactions;

  const nextTransactions = await getTransactions(publicKey, nextBefore);
  return [...transactions, ...nextTransactions];
};

const useWalletData = () => {
  const { publicKey } = useWallet();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  useQuery(['transactions', 'index'], () => getTransactions(publicKey!), {
    enabled: !!publicKey,
    onSuccess(data) {
      setTransactions(data);
    },
  });

  useEffect(() => {
    if (!publicKey) return;
    connection.onLogs(publicKey, async logs => {
      const { signature } = logs;
      const solanaTransaction = await connection.getParsedTransaction(
        signature,
      );

      const transaction = solanaTransactionToTransaction(
        solanaTransaction,
        publicKey,
      );
      if (!transaction) return;
      setTransactions(prev => [transaction, ...prev]);
    });
  }, [publicKey]);

  return { transactions };
};

export default useWalletData;
