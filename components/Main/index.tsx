import { memo, useState } from 'react';

import useWalletData from '../lib/hooks/useWalletData';
import MainPresentational from './MainPresentational';
import { Page } from './types';

const Main = memo(() => {
  const { transactions, status } = useWalletData();
  const [page, setPage] = useState<Page>('transactions');
  return (
    <MainPresentational
      transactions={transactions}
      page={page}
      status={status}
      onChangePage={setPage}
    />
  );
});

export default Main;
