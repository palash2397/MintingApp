// import moment from "moment";
// import { convertEtherToWei } from "../utils/currencyMethods";
 import { ethers } from "ethers";
//import {web3} from "web3-utils";
import { getContractInstance } from "../web3/web3ProviderMethods";



export const setMerkleRoot = async (merkleRoot, adminWalletAddress) => {
  const MintingAppContract = await getContractInstance('Minting App');
  const merkleResponse = await MintingAppContract.methods
    .setMerkleRoot(merkleRoot)
    .send({ from: adminWalletAddress });
  if (!merkleResponse.status) throw new Error(merkleResponse.error);
  return merkleResponse;
};


export const buyNFT = async (
  proof,
  selectedQuantity,
  userAddress,
) => {
  console.log(proof,
    selectedQuantity,
    userAddress)
  const MintingAppContract = await getContractInstance(
    'Minting App'
  );

 // console.log(MintingAppContract.methods, '---MintingAppContract');
//  const getMarkerRoot = await MintingAppContract.methods;
 // console.log(getMarkerRoot, '--getMarkerRoot');
  const result = await MintingAppContract.methods
    .buyNFT(proof, selectedQuantity)
    .send({ from: userAddress });
  return result;
};


export const getMintingCost = async () => {
  const MintingAppContract = await getContractInstance('Minting App');

  const getMintingCostResponse = await MintingAppContract.methods.getMintingCost().call()
  const result = ethers.utils.formatEther(getMintingCostResponse?.toString())

  return result;
};

// const costInWei = getMintingCost();
//const res = ethers.utils.formatEther(getMintingCostResponse?.toString())

// export const weiToEthConverter = (costInWei) => {
// //  const result = ethers.utils.formatEther(getMintingCost()?.toString());
//   return Number(res);
// };