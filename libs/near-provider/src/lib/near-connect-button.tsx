import React from 'react';
import { useNearContext } from './near-provider';
import './near-wallet-modal.css';
export default function NearConnectButton({
  children,
  className,
  style,
  disabled,
}: {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
}) {
  const { modal, accountId, signOut } = useNearContext();
  return (
    <button
      className={` ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      disabled={disabled}
      style={style}
      onClick={async () => {
        if (accountId) {
          await signOut();
        } else {
          modal?.show();
        }
      }}
    >
      {accountId ? truncateAccountId(accountId) : children}
    </button>
  );
}

function truncateAccountId(accountId: string) {
  if (accountId.length > 10) {
    return accountId.slice(0, 5) + '...' + accountId.slice(-5);
  }
}
