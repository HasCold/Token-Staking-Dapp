"use client";

import React from 'react'
import ConnectedAccount from './ConnectedAccount'
import ConnectedNetwork from './ConnectedNetwork'
import "./Navigation.css";
import ClaimStakeTokens from '../ClaimReward/ClaimReward';

const Navigation = () => {
  return (
    <header className="navbar">
    <div className="navbar-btns">
      <ClaimStakeTokens />
    </div>
    <div className="navbar-acc">
      <ConnectedAccount />
      <ConnectedNetwork />
    </div>
  </header>
  )
}

export default Navigation