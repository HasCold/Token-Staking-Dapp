"use client";

import React from 'react'
import ConnectedAccount from './ConnectedAccount'
import ConnectedNetwork from './ConnectedNetwork'

const Navigation = () => {
  return (
    <div>
        <ConnectedAccount />
        <ConnectedNetwork />
    </div>
  )
}

export default Navigation