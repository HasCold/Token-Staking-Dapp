import { ethers } from "ethers";
import StakingABI from "../ABI/Staking.ABI.json";
import StakeTokenABI from "../ABI/StakingToken.ABI.json";

//     signer will be null
// provider, stakingContract, stakeTokenContract, and chainId will be undefined

const connectWallet = async () => {
  try {
    let [signer, provider, stakingContract, stakeTokenContract, chainId] = [null];
    if(window.ethereum === "null"){  // checks whether window.ethereum object is present or not;  means metamask will inject window.ethereum object into your browser
        throw new Error("Metamask is not installed");
    }
        provider = new ethers.BrowserProvider(window.ethereum);
        signer = await provider.getSigner();  // performing also a write operation on blockchain
        await provider.send("eth_requestAccounts", []);  // automaically opens the metamask wallet

        const account = await window.ethereum.request({
            method: "eth_requestAccounts"
        });

        let chainIdHex = await window.ethereum.request({
            method: "eth_chainId"
        });
        chainId = parseInt(chainIdHex, 16);   // 16 characters in Hexadecimal digits
        // console.log("Chain", chainIdHex, chainId);  //  Chain 0xaa36a7 16

        let selectedAccount = account[0];
        if(!selectedAccount){
            throw new Error("No ethereum accounts available");
        }

        const stakingContractAddress = "0x1066d559A279B3674567D20801442733C56BEACa";
        const stakeTokenContractAddress = "0xb413083d512bcfcebeae6a1a17643318ee02f70f";

        stakingContract = new ethers.Contract(stakingContractAddress, StakingABI, signer);  // Instance of a contract
        stakeTokenContract = new ethers.Contract(stakeTokenContractAddress, StakeTokenABI, signer);

        return {provider, selectedAccount, stakeTokenContract, stakingContract, chainId};

  } catch (error) {
    console.error(error.message);
    throw error; 
  }
}

export default connectWallet;