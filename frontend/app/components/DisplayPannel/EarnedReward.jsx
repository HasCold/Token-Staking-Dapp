"use client";

import React, { useEffect, useState } from 'react'
import { useWeb3Context } from '../Wallet/Wallet';
import { ethers } from 'ethers';

const EarnedReward = () => {

  const {state} = useWeb3Context();
  const {stakingContract, selectedAccount} = state;
  const [earnedReward, setEarnedReward] = useState("0");

  const fetchEarnedReward = async () => {
    try {
      const earnedRewardWei = await stakingContract.earned(selectedAccount);
      const earnedRewardEth = ethers.formatUnits(earnedRewardWei.toString(), 18); // every token works with 18 decimal places 1 ether = 10^18 wei
      const formatEarnedRewardEth = Math.floor(earnedRewardEth).toFixed(2);  // you can also use parseFloat()
      setEarnedReward(formatEarnedRewardEth);

    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    stakingContract && fetchEarnedReward();
  }, [stakingContract, selectedAccount]);

  return (
    <div>EarnedReward : {earnedReward}</div>
  )
}

export default EarnedReward;