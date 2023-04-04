import { useContext, createContext, useEffect, useState } from 'react';
/* eslint-disable-next-line */

const NearContext = createContext({
  accountId: null as string | null,
});

export function NearProvider({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) {
  const [accountId, setAccountId] = useState<string | null>();

  return (
    <NearContext.Provider value={{ accountId: 'ewtd.testnet' }}>
      {children}
    </NearContext.Provider>
  );
}

export function useNearContext() {
  return useContext(NearContext);
}

export default NearProvider;
