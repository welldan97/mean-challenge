import {
  useConnection,
  useWallet,
  WalletContextState,
} from '@solana/wallet-adapter-react';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import TransactionsApi from '../../../api/TransactionsApi';
import { Transaction } from '../../../lib/Transaction';
import { WalletStatus } from '../../types';

const calcStatus = (
  queryStatus: 'loading' | 'error' | 'success',
  wallet: WalletContextState,
): WalletStatus => {
  if (wallet.connecting) return 'loading';
  if (wallet.disconnecting) return 'disconnecting';
  if (!wallet.connected) return 'disconnected';
  return queryStatus;
};

const useWalletData = () => {
  const wallet = useWallet();
  const { publicKey } = wallet;
  const { connection } = useConnection();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const { status: queryStatus } = useQuery(
    ['transactions', 'index', publicKey] as const,
    ({ queryKey }) => TransactionsApi.index(connection, queryKey[2]!),
    {
      enabled: !!publicKey,
      onSuccess(nextTransactions) {
        setTransactions(nextTransactions);
      },
    },
  );

  useEffect(() => {
    if (!publicKey) return;
    connection.onLogs(publicKey, async logs => {
      const { signature } = logs;

      const transaction = await TransactionsApi.getBySignature(
        connection,
        publicKey,
        signature,
      );
      if (!transaction) return;
      setTransactions(prev => [transaction, ...prev]);
    });
  }, [publicKey]);

  return {
    transactions,
    status: calcStatus(queryStatus, wallet),
  };
};

export default useWalletData;
