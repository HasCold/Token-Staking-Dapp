
export const handleAccountChange = async (setState) => {
    const account = await window.ethereum.request({
        method: "eth_requestAccounts"
    });
    const selectedAccount = account[0];
    console.log("Selected ", selectedAccount);

    setState(state => ({...state, selectedAccount}));  // when we have to update the state so first pass the state as an args then make some changing
}