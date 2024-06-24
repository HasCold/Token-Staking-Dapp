import React from 'react'
import Wallet from './components/Wallet/Wallet'
import Navigation from './components/Navigation/Navigation'
import DisplayPannel from './components/DisplayPannel/DisplayPannel'
import TokenApproval from './components/StakeToken/TokenApproval'
import StakeAmount from './components/StakeToken/StakeAmount'

const page = () => {
  return (
    <div>
      <Wallet>
        <Navigation />
        <DisplayPannel />
        <TokenApproval />
        <StakeAmount />
      </Wallet>
    </div>
  )
}

export default page