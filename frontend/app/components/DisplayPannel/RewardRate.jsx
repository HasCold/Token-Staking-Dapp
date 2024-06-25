"use client";

import React, {useState, useEffect} from 'react'
import { useWeb3Context } from '../Wallet/Wallet'
import { ethers } from 'ethers';
import "./DisplayPanel.css"

const RewardRate = () => {

    const {state} = useWeb3Context();
    const {stakingContract, selectedAccount} = state;  // to create the instance of the Staking Contract 
    const [rewardRate, setRewardRate] = useState("0");

    const fetchRewardRate = async () => {
        try {
            const rewardRateWei = await stakingContract.REWARD_RATE();
            const rewardRateEth = ethers.formatUnits(rewardRateWei.toString(), 18);  // every token works with the 1 ether = 10^18 wei
            setRewardRate(rewardRateEth);
            
        } catch (error) {
            console.error(error.message);
        }
    }
 
    useEffect(() => {
        stakingContract && fetchRewardRate();
    }, [stakingContract, selectedAccount]);

  return (
    <div className="reward-rate">
      <p>Reward Rate:</p>
      <span>{rewardRate} token/sec </span>
  </div>
  )
}

export default RewardRate;