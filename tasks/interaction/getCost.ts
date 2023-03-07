import { Signer } from "@ethersproject/abstract-signer";
import { task } from "hardhat/config";

import { MintingApp } from "../../types/contracts/MintingApp";
import { MintingApp__factory } from "../../types/factories/contracts/MintingApp__factory";
import { readContractAddress } from "../deploy/utils";

task("interaction:NFTgetCost").setAction(async function (_, { ethers }) {
  const accounts: Signer[] = await ethers.getSigners();
  const NFT = readContractAddress("MintingApp");
  const nftFactory: MintingApp__factory = <MintingApp__factory>(
    await ethers.getContractFactory("MintingApp", accounts[0])
  );
  const nft: MintingApp = <MintingApp>await nftFactory.attach(NFT);
  try {
    const res1 = await nft.getMintingCost();
    console.log(`NFT: cost of nft is ${res1} `);
  } catch (e) {
    console.error(" NFT error getCost", e);
  }
});
