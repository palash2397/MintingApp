import { getWeb3Provider } from "./connectWallet";

const getConvertPrice = async (convertTo = "eth", value) => {
  const web3 = await getWeb3Provider();
  if (convertTo === "eth") {
    const EthPrice = web3.utils.fromWei(value, "eth");
    return EthPrice;
  }
  if (convertTo === "USD") {
    return;
  }
};

export { getConvertPrice };
