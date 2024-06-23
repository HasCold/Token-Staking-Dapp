import React from 'react'
import StakedAmount from './StakedAmount';
import RewardRate from './RewardRate';
import EarnedReward from './EarnedReward';

const DisplayPannel = () => {
  return (
    <div>
        <StakedAmount />
        <RewardRate />
        <EarnedReward />
    </div>
  )
}

export default DisplayPannel;