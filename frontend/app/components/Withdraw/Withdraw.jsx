"use client";

import React, { useRef, useState } from 'react'
import Button from '../Button';
import { ethers } from 'ethers';
import { useWeb3Context } from '../Wallet/Wallet';
import { useStakeContext } from '@/app/context/StakingContext';
import "./Withdraw.css";
import toast from 'react-hot-toast';

const WithdrawStakeAmount = () => {

    const withdrawAmountRef = useRef();
    const {isReload, setIsReload} = useStakeContext();

    const {state} = useWeb3Context();
    const {stakingContract} = state;

    const withdrawStakeToken = async (e) => {
        e.preventDefault();

        const tokenAmount = withdrawAmountRef.current.value.trim();
        if(isNaN(tokenAmount) || tokenAmount <= 0){
            alert("Invalid amount");
            console.error("Please enter a valid positive number");
            return;
        }

        const amountToWithdraw = ethers.parseUnits(tokenAmount.toString(), 18).toString();

        // Approval of using amount given to the staking smart contract 
        try {
            const transaction = await stakingContract.withdrawStakedTokens(amountToWithdraw);
            await toast.promise(transaction.wait(),
            {
              loading: "Transaction is pending...",
              success: () => {
                setIsReload(!isReload);
                return 'Transaction successful 👌'
            }, 
              error: 'Transaction failed 🤯'
            });
            withdrawAmountRef.current.value = "";

            // const receipt = await transaction.wait();  // confirmation from the node that the block is successfully mined.
            // if(receipt.status === 1){
            //     setTransactionStatus("Transaction is successful");
            //     setTimeout(() => {
            //         setTransactionStatus("");
            //     }, 5000);   // 5000ms -> 5 seconds
            //     withdrawAmountRef.current.value = "";
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
            <form className="withdraw-form" onSubmit={withdrawStakeToken}>
                <label htmlFor='withdrawStakeToken'>Withdraw Stake Token</label>
                <input ref={withdrawAmountRef} type="text" id='withdrawStakeToken'/>
                <Button type={"submit"} label={"Withdraw Token"}/>
            </form>
        </div>
      )
}

export default WithdrawStakeAmount;