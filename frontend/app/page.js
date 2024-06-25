import React from 'react'
import Wallet from './components/Wallet/Wallet'
import Navigation from './components/Navigation/Navigation'
import DisplayPannel from './components/DisplayPannel/DisplayPannel'
import TokenApproval from './components/StakeToken/TokenApproval'
import StakeAmount from './components/StakeToken/StakeAmount'
import WithdrawStakeAmount from './components/Withdraw/Withdraw'
import ClaimStakeTokens from './components/ClaimReward/ClaimReward'
import StakingProvider from './context/StakingContext'

const page = () => {
  return (
    <div>
      <Wallet>
        <Navigation />

        <StakingProvider>
        <DisplayPannel />
        <StakeAmount />
        <WithdrawStakeAmount />
        </StakingProvider>
        
        <TokenApproval />
        <ClaimStakeTokens />
      </Wallet>
    </div>
  )
}

export default page