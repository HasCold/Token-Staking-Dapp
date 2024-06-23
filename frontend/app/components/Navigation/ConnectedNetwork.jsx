"use client"

import React from 'react'
import { useWeb3Context } from '../Wallet/Wallet';

const ConnectedNetwork = () => {

    const {state} = useWeb3Context();  // Through the chain Id we can know what the network is connected 
    const {chainId} = state;
    
    if(chainId === 11155111){   // chainId 11155111 for sepolia testnet
      return <p>Connected Network : Sepolia</p>
    }else if(!chainId){
      return <p>Not connected to any network</p>
    }
    else{
      return <p>Connected Network : Unsupported</p>
    }

}

export default ConnectedNetwork;