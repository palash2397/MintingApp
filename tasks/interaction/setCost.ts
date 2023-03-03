import { Signer } from "@ethersproject/abstract-signer";
import { task } from "hardhat/config";
import { MintingApp } from "../../types/contracts/MintingApp";
import { MintingApp__factory } from "../../types/factories/contracts/MintingApp__factory";
import cArguments from "../deploy/arguments/jtrnft";
import { readContractAddress } from "../deploy/utils";

task("interaction:setCost")
  .addParam("cost ", "Input the new cost")
  .setAction(async function (_, { ethers }) {
   
    const accounts: Signer[] = await ethers.getSigners();
    const NFT = readContractAddress("MintingApp");
    const { cost } = cArguments;
    const nftFactory: MintingApp__factory = <MintingApp__factory>(
      await ethers.getContractFactory("MintingApp", accounts[0])
    );
    const nft: MintingApp = <MintingApp>await nftFactory.attach(NFT);
    try {
      const res1 = await nft.setCost(cost);
      console.log(`NFT: setcost to ${cost} `);
      console.log("tx hash: ", res1.hash);
    } catch (e) {
      console.error(" NFT error setCost", e);
    }
  });
