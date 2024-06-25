"use client";

import React, { useState } from 'react'
import Button from '../Button';
import { useWeb3Context } from '../Wallet/Wallet';

const ClaimStakeTokens = () => {

    const [transactionStatus, setTransactionStatus] = useState("");

    const {state} = useWeb3Context();
    const {stakingContract} = state;

// To claimed the reward token first we transfer the amount of required tokens from RewardToken Contract Address to Staking Contrat Address so suppose I would transfer 100000 amount of tokens through the Remix IDE and also check the balanceOf msg.sender

    const claimReward = async () => {

        try {
            const transaction = await stakingContract.getReward();
            setTransactionStatus("Transaction is in pending");
            // const ObjTransac = await provider.getTransaction(transaction.hash);  // Returns the transaction that this log occurred in.

            const receipt = await transaction.wait();  // confirmation from the node that the block is successfully mined.
            if(receipt.status === 1){
                setTransactionStatus("Transaction is successful");
                setTimeout(() => {
                    setTransactionStatus("");
                }, 5000);   // 5000ms -> 5 seconds
            }else{
                setTransactionStatus("Claimed Reward Failed !");
            }

        } catch (error) {
            console.error("Claim Reward Failed", error.message);    
        }
    }

    return (
        <div>
            {transactionStatus && <p>{transactionStatus}</p>}
                <Button type={"submit"} onClick={claimReward} label={"Claim Reward "}/>
        </div>
      )
}

export default ClaimStakeTokens;