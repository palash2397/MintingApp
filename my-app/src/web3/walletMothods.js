import { convertWeiToEther } from "../../src/utils/currencyMethods";
import { getContractInstance, getWeb3Provider } from "./web3ProviderMethods";

const envNetworkId = process.env.REACT_APP_ETHEREUM_NETWORK_ID;

export const getWalletAstTokenBalance = async wallet_address => {
  const AstTokenContract = await getContractInstance();
  const response = await AstTokenContract.methods.balanceOf(wallet_address).call();
  const balanceInEth = convertWeiToEther(response);
  return balanceInEth;
};

export const connectWallet = async (envNetworkId, envNetworkIdInHex) => {
  if (window.ethereum ) {
    const { web3 } = await getWeb3Provider();
 
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const networkId = await web3.eth.net.getId();
    if (envNetworkId !== networkId) {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: envNetworkIdInHex }],
      });
    }
    return { walletAddress: accounts[0], networkID: networkId };
  } else {
    window.location.href = process.env.REACT_APP_METAMASK_DOWNLOAD_LINK_FOR_MOBILE;
    throw new Error("Wallet app not found");
  }
};

export function addWalletEventListener(accountCallback, networkCallback) {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", function () {
      accountCallback();
    });
    window.ethereum.on("networkChanged", async networkId => {
      if (envNetworkId !== networkId) networkCallback();
    });
  }
}

export async function checkWalletConnection(callbackFuntion) {
  const { web3 } = await getWeb3Provider();
  const isConnected = await web3.eth.getAccinterfaceounts();
  const value = isConnected.length === 0 ? false : true;
  callbackFuntion(value);
}
