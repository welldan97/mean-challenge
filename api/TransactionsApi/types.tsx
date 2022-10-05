import {
  ParsedTransactionWithMeta,
  PartiallyDecodedInstruction,
} from '@solana/web3.js';

type Info = {
  destination: string;
  lamports: number;
  source: string;
};

export interface RequiredParsedTransactionWithMeta
  extends ParsedTransactionWithMeta {
  meta: NonNullable<ParsedTransactionWithMeta['meta']>;
  blockTime: NonNullable<ParsedTransactionWithMeta['blockTime']>;
}

interface TransferInstruction extends PartiallyDecodedInstruction {
  parsed: {
    type: 'transfer';
    info: Info;
  };
}

export interface TransferParsedTransactionWithMeta
  extends RequiredParsedTransactionWithMeta {
  transaction: RequiredParsedTransactionWithMeta['transaction'] & {
    message: RequiredParsedTransactionWithMeta['transaction']['message'] & {
      instructions: [TransferInstruction];
    };
  };
}
