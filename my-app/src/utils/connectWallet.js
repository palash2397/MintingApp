// import Web3 from 'web3';

// export const getBrowserWallet = () => {
//   switch (walletName) {
//     case 'metamask':
//       window.ethereum ? true : false;
//       break;
//     default:
//       true;
//       break;
//   }
// };

// export const getWeb3Provider = async () => {
//   await window.ethereum.request({ method: 'eth_requestAccounts' });
//   const web3 = new Web3(window.ethereum);
//   return web3;
// };

// export const connectWallet = async () => {
//   const web3 = await getWeb3Provider();
//   const accounts = await web3.eth.getAccounts();
//   const netWorkId = await web3.eth.net.getId();
//   const getBalance = await web3.eth.getBalance(accounts[0]);
//   return { accounts, netWorkId, getBalance };
// };
