import { Signer } from "@ethersproject/abstract-signer";
import { task } from "hardhat/config";
import { MintingApp__factory } from "../../types/factories/contracts/MintingApp__factory";
import { MintingApp  } from "../../types/contracts/MintingApp";
import { readContractAddress } from "../deploy/utils";
import cArguments from "../deploy/arguments/jtrnft";
task("interaction:NFTsetmerkleRoot")
.setAction(async function (_, { ethers }) {
  const accounts: Signer[] = await ethers.getSigners();
  const NFT = readContractAddress("MintingApp");
  const { merkleroot } = cArguments;
  const nftFactory: MintingApp__factory = <MintingApp__factory>await ethers.getContractFactory("MintingApp", accounts[0]);
  const nft: MintingApp = <MintingApp>await nftFactory.attach(NFT);
  try {
    const res1 = await nft.setMerkleRoot(merkleroot);
    console.log(`NFT: setMerkleRoot to ${merkleroot} `);
    console.log("tx hash: ", res1.hash);
  } catch (e) {
    console.error(" NFT error setMerkleRoot", e);
  }
});

