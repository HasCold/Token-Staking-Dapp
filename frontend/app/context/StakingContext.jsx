"use client";

import React, { createContext, useContext, useState } from 'react'

const StakingContext = createContext();

const StakingProvider = ({children}) => {

    const [isReload, setIsReload] = useState(false);

  return (
    <div>
        <StakingContext.Provider value={{isReload, setIsReload}}>
            {children}
        </StakingContext.Provider>
    </div>
  )
}

export const useStakeContext = () => useContext(StakingContext);

export default StakingProvider;