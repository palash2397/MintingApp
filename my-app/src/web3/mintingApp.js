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

export const approveJTRtoken= async(spender, nftCost, address)=>{
 // debugger; // eslint-disable-line no-debugger
  const JTRtokenContract = await getContractInstance();
  const response =  await JTRtokenContract.methods
             .approve(spender, nftCost)
             .send({from: address})
  return response;
}

export const ethToWeiConverter = (value) => {
 // debugger; // eslint-disable-line no-debugger
  const result = ethers.utils.parseUnits(value?.toString());
  return Number(result);
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

export const setRestriction = async( address)=>{
  const MintingAppContract = await getContractInstance('Minting App');
  const setRestrictionResponse = await MintingAppContract.methods
                .setRestriction()
                .send({from: address})
  return setRestrictionResponse;
}

