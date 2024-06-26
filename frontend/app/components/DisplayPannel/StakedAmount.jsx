"use client";

import React, {useState, useEffect} from 'react'
import { useWeb3Context } from '../Wallet/Wallet'
import { ethers } from 'ethers';
import { useStakeContext } from '@/app/context/StakingContext';
import "./DisplayPanel.css"
import toast from 'react-hot-toast';

const StakedAmount = () => {

    const {state} = useWeb3Context();
    const {isReload} = useStakeContext();

    const {stakingContract, selectedAccount} = state;  // to create the instance of the Staking Contract 
    const [stakedAmount, setStakedAmount] = useState("0");

    const fetchStakedBalance = async () => {
        try {
            const amountStakedWei = await stakingContract.stakedBalance(selectedAccount);
            const amountStakeEth = ethers.formatUnits(amountStakedWei.toString(), 18);  // every token works with the 1 ether = 10^18 wei
            setStakedAmount(amountStakeEth);
            
        } catch (error) {
            toast.error("Error fetching staked amount");
            console.error(error.message);
        }
    }
 
    useEffect(() => {
        stakingContract && fetchStakedBalance();
    }, [stakingContract, selectedAccount, isReload]);

  return (
    <div className="staked-amount">
       <p>Staked Amount: </p> <span>{stakedAmount}</span>
    </div>
  )
}

export default StakedAmount