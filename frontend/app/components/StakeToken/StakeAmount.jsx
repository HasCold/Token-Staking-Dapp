"use client";

import React, { useRef, useState } from 'react'
import Button from '../Button';
import { ethers } from 'ethers';
import { useWeb3Context } from '../Wallet/Wallet';
import { useStakeContext } from '@/app/context/StakingContext';
import "./StakeToken.css";
import toast from 'react-hot-toast';

const StakeAmount = () => {

    const stakeAmountRef = useRef();

    const {state} = useWeb3Context();
    const {stakingContract} = state;
    const {isReload, setIsReload} = useStakeContext();

    const stakeToken = async (e) => {
        e.preventDefault();

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
            // const ObjTransac = await provider.getTransaction(transaction.hash);  // Returns the transaction that this log occurred in.
            await toast.promise(transaction.wait(), {
                loading: "Transaction is pending...",
                success: () => {
                    setIsReload(!isReload);
                  return 'Transaction successful 👌'
                },
                error: 'Transaction failed 🤯'
            })
            stakeAmountRef.current.value = "";

            // const receipt = await transaction.wait();  // confirmation from the node that the block is successfully mined.
            // if(receipt.status === 1){
            //     setTransactionStatus("Transaction is successful");
            //     setIsReload(!isReload);
            //     setTimeout(() => {
            //         setTransactionStatus("");
            //     }, 5000);   // 5000ms -> 5 seconds
            //     stakeAmountRef.current.value = "";
            // }else{
            //     setTransactionStatus("Staking Failed !");
            // }

        } catch (error) {
            toast.error("Staking Failed");
            console.error(error.message);    
        }
    }

    return (
        <div>
            <form onSubmit={stakeToken}  className="stake-amount-form">
                <label  className="stake-input-label" htmlFor='stakeToken'>Enter Staked Amount:</label>
                <input ref={stakeAmountRef} type="text" id='stakeToken'/>
                <Button type={"submit"} label={"Stake Token"}/>
            </form>
        </div>
      )
}

export default StakeAmount;