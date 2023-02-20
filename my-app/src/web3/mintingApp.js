import { convertEtherToWei } from "../utils/currencyMethods";
import { getContractInstance } from "../web3/web3ProviderMethods";
import moment from "moment";

export const setMerkleRoot = async (merkleRoot, adminWalletAddress) => {
  const MintingAppContract = await getContractInstance("Minting App");
  const merkleResponse = await MintingAppContract.methods.setMerkleRoot(merkleRoot).send({ from: adminWalletAddress });
  if (!merkleResponse.status) throw new Error(merkleResponse.error);
  return merkleResponse;
};

export const buyNFT = async (proof, mintCost, selectedQuantity, userAddress) => {
  const MintingAppContract = await getContractInstance("Minting App");
  const result = await MintingAppContract.methods
    .buyNFT(selectedQuantity.toString())
    .send({ from: userAddress, value: mintCost });
  return result;
};
