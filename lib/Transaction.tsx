export interface Transaction {
  from: string;
  to: string;
  amount: number;
  timestamp: number;
  fromBalance: number;
  toBalance: number;
  fee: number;
}
