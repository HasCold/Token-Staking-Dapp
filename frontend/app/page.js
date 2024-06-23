import React from 'react'
import Wallet from './components/Wallet/Wallet'
import Navigation from './components/Navigation/Navigation'
import DisplayPannel from './components/DisplayPannel/DisplayPannel'

const page = () => {
  return (
    <div>
      <Wallet>
        <Navigation />
        <DisplayPannel />
      </Wallet>
    </div>
  )
}

export default page