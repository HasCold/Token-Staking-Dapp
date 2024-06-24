"use client";

import React, { useRef, useState } from 'react'
import Button from '../Button';
import { ethers } from 'ethers';
import { useWeb3Context } from '../Wallet/Wallet';

const StakeAmount = () => {

    const stakeAmountRef = useRef();
    const [transactionStatus, setTransactionStatus] = useState("");

    const {state} = useWeb3Context();
    const {stakingContract} = state;

    const stakeToken = async () => {
        const tokenAmount = stakeAmountRef.current.value.trim();
        if(isNaN(tokenAmount) || tokenAmount <= 0){
            alert("Invalid amount");
            console.error("Please enter a valid positive number");
            return;
        }

        const amountToStake = ethers.parseUnits(tokenAmount.toString(), 18).toString();
        
        // Approval of using amount given to the staking smart contract 
        try {
            const transaction = await stakingContract.stake(amountToStake);
            setTransactionStatus("Transaction is in pending");
            // const ObjTransac = await provider.getTransaction(transaction.hash);  // Returns the transaction that this log occurred in.

            const receipt = await transaction.wait();  // confirmation from the node that the block is successfully mined.
            if(receipt.status === 1){
                setTransactionStatus("Transaction is successful");
                setTimeout(() => {
                    setTransactionStatus("");
                }, 5000);   // 5000ms -> 5 seconds
                stakeAmountRef.current.value = "";
            }else{
                setTransactionStatus("Staking Failed !");
            }

        } catch (error) {
            console.error(error.message);    
        }
    }

    return (
        <div>
            {transactionStatus && <p>{transactionStatus}</p>}
            <form onSubmit={stakeToken}>
                <label htmlFor='stakeToken'>Token Stake</label>
                <input ref={stakeAmountRef} type="text" id='stakeToken'/>
                <Button type={"submit"} label={"Stake Token"}/>
            </form>
        </div>
      )
}

export default StakeAmount;