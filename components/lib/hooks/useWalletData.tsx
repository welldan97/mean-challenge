import {
  ParsedTransactionWithMeta,
  Connection,
  PublicKey,
} from '@solana/web3.js';

import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Transaction } from '../../../lib/Transaction';

const endpoint = 'https://api.devnet.solana.com';
const connection = new Connection(endpoint, 'confirmed');

/*
const getBalance = async publicKey => {
  const balance = await connection.getBalance(publicKey);
  console.log(`balance: ${balance}`);
  connection.onLogs(publicKey, logs => console.log('logs', logs));
  connection.onAccountChange(publicKey, acc => console.log('acc', acc));
};
*/

type Info = {
  destination: string;
  lamports: number;
  source: string;
};

const isTransfer = (solanaTransaction: ParsedTransactionWithMeta | null) => {
  if (!solanaTransaction) return false;
  const instruction = solanaTransaction.transaction.message.instructions[0];
  if (!('parsed' in instruction)) return false;
  return instruction.parsed?.type === 'transfer';
};

const solanaTransactionToTransaction = (
  solanaTransaction: ParsedTransactionWithMeta | null,
) => {
  if (!isTransfer(solanaTransaction)) return undefined;
  const info = solanaTransaction!.transaction.message.instructions[0].parsed
    .info as Info;

  const { destination, lamports: amount, source } = info;
  const { fee } = solanaTransaction.meta;
  const balances = solanaTransaction.meta.postBalances.slice(0, 2);
  const timestamp = solanaTransaction.blockTime;
  return {
    from: source,
    to: destination,
    amount,
    timestamp,
    fee,
    fromBalance: balances[0],
    toBalance: balances[1],
  } as Transaction;
};

const getTransactions = async (publicKey: PublicKey) => {
  const signatures = await connection.getSignaturesForAddress(publicKey, {
    limit: 10,
  });

  const solanaTransactions = await connection.getParsedTransactions(
    signatures.map(s => s.signature),
  );

  return solanaTransactions
    .map(solanaTransactionToTransaction)
    .filter(e => e !== undefined) as Transaction[];
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

      const transaction = solanaTransactionToTransaction(solanaTransaction);
      if (!transaction) return;
      setTransactions(prev => [transaction, ...prev]);
    });
  }, [publicKey]);

  return { transactions };
};

export default useWalletData;
