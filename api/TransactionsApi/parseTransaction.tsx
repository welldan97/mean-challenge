import { ParsedTransactionWithMeta, PublicKey } from '@solana/web3.js';

import { Transaction } from '../../lib/Transaction';
import {
  RequiredParsedTransactionWithMeta,
  TransferParsedTransactionWithMeta,
} from './types';

const isParseable = (
  solanaTransaction: ParsedTransactionWithMeta | null,
): solanaTransaction is RequiredParsedTransactionWithMeta =>
  !!solanaTransaction?.meta;

const isTransferTransaction = (
  solanaTransaction: RequiredParsedTransactionWithMeta,
): solanaTransaction is TransferParsedTransactionWithMeta => {
  const instruction = solanaTransaction.transaction.message.instructions[0];
  return 'parsed' in instruction && instruction.parsed?.type === 'transfer';
};

const parseBaseData = (
  solanaTransaction: RequiredParsedTransactionWithMeta,
) => {
  const { fee } = solanaTransaction.meta;
  const postBalances = solanaTransaction.meta.postBalances.slice(0, 2);
  const preBalances = solanaTransaction.meta.preBalances.slice(0, 2);
  const timestamp = solanaTransaction.blockTime;

  return { fee, postBalances, preBalances, timestamp };
};

const toOtherTransaction = (
  solanaTransaction: RequiredParsedTransactionWithMeta,
  publicKey: PublicKey,
) => {
  const { fee, postBalances, preBalances, timestamp } =
    parseBaseData(solanaTransaction);

  return {
    type: 'other',
    walletAddress: publicKey.toBase58(),
    timestamp,
    fee,
    balanceBefore: preBalances[0],
    balanceAfter: postBalances[0],
  } as Transaction;
};

const toTransferTransaction = (
  solanaTransaction: TransferParsedTransactionWithMeta,
  publicKey: PublicKey,
) => {
  const { fee, postBalances, preBalances, timestamp } =
    parseBaseData(solanaTransaction);

  const instruction = solanaTransaction.transaction.message.instructions[0];
  const { info } = instruction.parsed;

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

const parseTransaction = (
  solanaTransaction: ParsedTransactionWithMeta | null,
  publicKey: PublicKey,
) => {
  if (!isParseable(solanaTransaction)) return undefined;

  if (!isTransferTransaction(solanaTransaction))
    return toOtherTransaction(solanaTransaction, publicKey);

  return toTransferTransaction(solanaTransaction, publicKey);
};

export default parseTransaction;
