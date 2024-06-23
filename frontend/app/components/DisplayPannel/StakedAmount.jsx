"use client";

import React, {useState, useEffect} from 'react'
import { useWeb3Context } from '../Wallet/Wallet'

const StakedAmount = () => {

    const {state} = useWeb3Context();
    const {stakingContract, selectedAccount} = state;  // to create the instance of the Staking Contract 
    const [stakedAmount, setStakedAmount] = useState("0");

    const fetchStakedBalance = async () => {
        try {
            const amountStaked = await stakingContract.stakedBalance(selectedAccount);
            console.log(amountStaked);
        } catch (error) {
            console.error(error.message);
        }
    }
 
    useEffect(() => {
        stakingContract && fetchStakedBalance();
    }, [stakingContract, selectedAccount]);

  return (
    <div>StakedAmount</div>
  )
}

export default StakedAmount