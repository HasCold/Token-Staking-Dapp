//  When the user mistakenly choose the unsupporeted network so in this case handleChainChange function will work  

export const handleChainChange = async (setState) => { 
    const chainIdHex = await window.ethereum.request({
        method: "eth_chainId"
    });
    const chainId = parseInt(chainIdHex, 16); 
    console.log("Chain ", chainId);

    setState(state => ({...state, chainId}));  // when we have to update the state so first pass the state as an args then make some changing
} 