"use client";

import React, {useState, useEffect} from 'react'
import { useWeb3Context } from '../Wallet/Wallet'
import { ethers } from 'ethers';

const StakedAmount = () => {

    const {state} = useWeb3Context();
    const {stakingContract, selectedAccount} = state;  // to create the instance of the Staking Contract 
    const [stakedAmount, setStakedAmount] = useState("0");

    const fetchStakedBalance = async () => {
        try {
            const amountStakedWei = await stakingContract.stakedBalance(selectedAccount);
            const amountStakeEth = ethers.formatUnits(amountStakedWei.toString(), "wei");  // every token works with the 1 ether = 10^18 wei
            setStakedAmount(amountStakeEth);
            
        } catch (error) {
            console.error(error.message);
        }
    }
 
    useEffect(() => {
        stakingContract && fetchStakedBalance();
    }, [stakingContract, selectedAccount]);

  return (
    <div>Staked amount : {stakedAmount}</div>
  )
}

export default StakedAmount