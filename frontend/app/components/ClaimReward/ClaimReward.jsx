"use client";

import React, { useState } from 'react'
import Button from '../Button';
import { useWeb3Context } from '../Wallet/Wallet';
import "./ClaimReward.css";
import toast from 'react-hot-toast';

const ClaimStakeTokens = () => {

    const {state} = useWeb3Context();
    const {stakingContract} = state;

// To claimed the reward token first we transfer the amount of required tokens from RewardToken Contract Address to Staking Contrat Address so suppose I would transfer 100000 amount of tokens through the Remix IDE and also check the balanceOf msg.sender

    const claimReward = async () => {

        try {
            const transaction = await stakingContract.getReward();
            await toast.promise(transaction.wait(), {
                loading: "Transaction is pending",
                success: 'Transaction successful 👌',  
                error: 'Transaction failed 🤯'
            });  // confirmation from the node that the block is successfully mined.

            // const receipt = await transaction.wait();  // confirmation from the node that the block is successfully mined.
            // if(receipt.status === 1){
            //     setTransactionStatus("Transaction is successful");
            //     setTimeout(() => {
            //         setTransactionStatus("");
            //     }, 5000);   // 5000ms -> 5 seconds
            // }else{
            //     setTransactionStatus("Claimed Reward Failed !");
            // }

        } catch (error) {
            console.error("Claim Reward Failed", error.message);    
        }
    }

    return (
        <div className='claim-reward'>
            {/* {transactionStatus && <p>{transactionStatus}</p>} */}
                <Button type={"submit"} onClick={claimReward} label={"Claim Reward "}/>
        </div>
      )
}

export default ClaimStakeTokens;