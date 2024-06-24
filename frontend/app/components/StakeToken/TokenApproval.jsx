"use client";

import React, { useRef, useState } from 'react'
import Button from '../Button';
import { ethers } from 'ethers';
import { useWeb3Context } from '../Wallet/Wallet';

const TokenApproval = () => {

    const approvedTokenRef = useRef();
    const [transactionStatus, setTransactionStatus] = useState("");

    const {state} = useWeb3Context();
    const {stakingContract, stakeTokenContract, selectedAccount} = state;

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
            setTransactionStatus("Transaction is in pending");
            // const ObjTransac = await provider.getTransaction(transaction.hash);  // Returns the transaction that this log occurred in.

            const receipt = await transaction.wait();  // confirmation from the node that the block is successfully mined.
            if(receipt.status === 1){
                setTransactionStatus("Transaction is successful");
                setTimeout(() => {
                    setTransactionStatus("");
                }, 5000);   // 5000ms -> 5 seconds
                approvedTokenRef.current.value = "";
            }else{
                setTransactionStatus("Transaction Failed !");
            }

        } catch (error) {
            console.error(error.message);    
        }

    }

  return (
    <div>
        {transactionStatus && <p>{transactionStatus}</p>}
        <form onSubmit={approveToken}>
            <label htmlFor='approveToken'>Token Approval</label>
            <input ref={approvedTokenRef} type="text" id='approveToken'/>
            <Button type={"submit"} label={"Approve"}/>
        </form>
    </div>
  )
}

export default TokenApproval;