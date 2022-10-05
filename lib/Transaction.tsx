interface TransferTransaction {
  type: 'send' | 'receive';
  walletAddress: string;
  timestamp: number;
  fee: number;
  balanceBefore: number;
  balanceAfter: number;
  address: string;
  amount: number;
}

interface OtherTransaction {
  type: 'other';
  walletAddress: string;
  timestamp: number;
  fee: number;
  balanceBefore: number;
  balanceAfter: number;
}

export type Transaction = TransferTransaction | OtherTransaction;
