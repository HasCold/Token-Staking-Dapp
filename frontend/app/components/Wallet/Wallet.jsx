"use client";

import Web3Context from '@/app/context/Web3Context';
import connectWallet from '@/app/utils/connectWallet';
import React, {useState, useContext, useEffect} from 'react'
import Button from '../Button';
import { handleAccountChange } from '@/app/utils/handleAccountChange';
import { handleChainChange } from '@/app/utils/handleChainChange';

// Refer How to use the MetaMask Wallet extension :- https://docs.metamask.io/wallet/reference/provider-api/ 
 
const Wallet = ({children}) => {

    const [state, setState] = useState({  // set the web 3 states
        provider: null,
        selectedAccount: null,
        stakingContract: null,
        stakeTokenContract: null,
        chainId: null
    });
    
    const [loading, setLoading] = useState(false);

    const handleWallet = async () => {
        try {
            setLoading(true);
            
            const {provider, selectedAccount, stakingContract, stakeTokenContract, chainId} = await connectWallet();
            setState({provider, selectedAccount, stakingContract, stakeTokenContract, chainId});

        } catch (error) {
            console.error("Error in connecting wallet :- ", error.message);
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        window.ethereum.on("accountsChanged", () => handleAccountChange(setState) );
        window.ethereum.on("chainChanged", () => handleChainChange(setState));

        return () => {  // cleanup function runs when the component is unmount or destroy
            window.ethereum.removeListener("accountsChanged", () => handleAccountChange(setState));
            window.ethereum.removeListener("chainChanged", () => handleChainChange(setState));                
        }
    }, []);

  return (
    <>
    <Web3Context.Provider value={{state}} >
        {children}
    </Web3Context.Provider>
    
    {loading && <p>Loading...</p>}
    <div>wallet</div>
    <Button onClick={handleWallet} type={"button"} bool={loading} label={"Connect Wallet"} />
    </>
  )
}

export const useWeb3Context = () => useContext(Web3Context);

export default Wallet