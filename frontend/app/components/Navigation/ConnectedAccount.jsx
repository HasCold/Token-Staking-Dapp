"use client"

import React from 'react'
import { useWeb3Context } from '../Wallet/Wallet';

const ConnectedAccount = () => {

    const {state} = useWeb3Context();
    const {selectedAccount} = state;
  return (
      <div>
        <p className="connected-ac">
          {selectedAccount ? selectedAccount : "Connect Account"}
        </p>
      </div>
  )
}

export default ConnectedAccount;