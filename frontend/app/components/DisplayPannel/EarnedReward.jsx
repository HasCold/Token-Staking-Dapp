"use client";

import React, { useEffect, useState } from 'react'
import { useWeb3Context } from '../Wallet/Wallet';
import { ethers } from 'ethers';

const EarnedReward = () => {

  const {state} = useWeb3Context();
  const {stakingContract, selectedAccount} = state;
  let interval;

  const [earnedReward, setEarnedReward] = useState("0");

  const fetchEarnedRewardInfo = async () => {
    try {
      const earnedRewardWei = await stakingContract.earned(selectedAccount);
      const earnedRewardEth = ethers.formatUnits(earnedRewardWei.toString(), 18); // every token works with 18 decimal places 1 ether = 10^18 wei
      const formatEarnedRewardEth = Math.floor(earnedRewardEth).toFixed(2);  // you can also use parseFloat()
      setEarnedReward(formatEarnedRewardEth);
    } catch (error) {
      console.error(error.message);
    }

    interval = setInterval(stakingContract && fetchEarnedRewardInfo, 20000);  // 20000 ms = 20 seconds
  }

  useEffect(() => {
    stakingContract && selectedAccount && fetchEarnedRewardInfo();

    return () => {  // cleanup function runs when the component is destroyed or unmounts
      clearInterval(interval);
    }
  }, [stakingContract, selectedAccount]);

  return (
    <div>EarnedReward : {earnedReward}</div>
  )
}

export default EarnedReward;