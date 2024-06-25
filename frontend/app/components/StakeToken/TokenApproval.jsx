"use client";

import React, { useRef, useState } from 'react'
import Button from '../Button';
import { ethers } from 'ethers';
import { useWeb3Context } from '../Wallet/Wallet';
import toast from 'react-hot-toast';

const TokenApproval = () => {

    const approvedTokenRef = useRef();
    
    const {state} = useWeb3Context();
    const {stakingContract, stakeTokenContract} = state;

    const approveToken = async (e) => {
        e.preventDefault();
        const amount = approvedTokenRef.current.value.trim();

        if(isNaN(amount) || amount <= 0){
            alert("Enter only integers");
            console.error("Please enter a valid positive number");
            return;
        }

        const amountToSend = ethers.parseUnits(amount.toString(), 18).toString();
        
        // Approval of using amount given to the staking smart contract 
        try {
            const transaction = await stakeTokenContract.approve(stakingContract.target, amountToSend);
            await toast.promise(transaction.wait(),
            {
              loading: "Transaction is pending...",
              success: 'Transaction successful 👌',
              error: 'Transaction failed 🤯'
            });
            approvedTokenRef.current.value = "";

            // const receipt = await transaction.wait();  // confirmation from the node that the block is successfully mined.
            // if(receipt.status === 1){
            //     setTransactionStatus("Transaction is successful");
            //     setTimeout(() => {
            //         setTransactionStatus("");
            //     }, 5000);   // 5000ms -> 5 seconds
            //     approvedTokenRef.current.value = "";
            // }else{
            //     setTransactionStatus("Transaction Failed !");
            // }

        } catch (error) {
            toast.error("Token Approval Failed");
            console.error(error.message);    
        }

    }

  return (
    <div>
        <form onSubmit={approveToken}  className="token-amount-form">
            <label htmlFor='approveToken'  className="token-input-label">Token Approval :</label>
            <input ref={approvedTokenRef} type="text" id='approveToken'/>
            <Button type={"submit"} label={"Token Approval"}/>
        </form>
    </div>
  )
}

export default TokenApproval;