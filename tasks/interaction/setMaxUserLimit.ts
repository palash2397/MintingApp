import { Signer } from "@ethersproject/abstract-signer";
import { task } from "hardhat/config";
import { MintingApp__factory } from "../../types/factories/contracts/MintingApp__factory";
import { MintingApp  } from "../../types/contracts/MintingApp";
import { readContractAddress } from "../deploy/utils";
import cArguments from "../deploy/arguments/jtrnft";
task("interaction:setUserlimit")
.addParam("userlimit ")
.setAction(async function (_, { ethers }) {
  const accounts: Signer[] = await ethers.getSigners();
  const NFT = readContractAddress("MintingApp");
  const { maxUserLimit } = cArguments;
  const nftFactory: MintingApp__factory = <MintingApp__factory>await ethers.getContractFactory("MintingApp", accounts[0]);
  const nft: MintingApp = <MintingApp>await nftFactory.attach(NFT);
  try {
    const res1 = await nft.setmaxUserLimit(maxUserLimit);
    console.log(`NFT: user limit to ${maxUserLimit} `);
    console.log("tx hash: ", res1.hash);
  } catch (e) {
    console.error("NFT error user limit", e);
  }
});


// task("interaction:<interaction name>")
//   .addParam("round", "Input the new round number")
//   .setAction(async function (taskArguments: TaskArguments, { ethers }) {
//     const { round } = taskArguments; // params
//     const accounts: Signer[] = await ethers.getSigners();
//     const mpwrStakingAddress = readContractAddress("mpwr-staking-klaytn"); // read contract

//     const stakingFactory: MPWRStakingKlaytn__factory = <MPWRStakingKlaytn__factory>(
//       await ethers.getContractFactory("MPWRStakingKlaytn", accounts[0])
//     ); 

//     const staking: MPWRStakingKlaytn = <MPWRStakingKlaytn>await stakingFactory.attach(mpwrStakingAddress);

//     try {
//       const res = await staking.setCurrentRound(round);

//       console.log(`MPWR Staking Klaytn: set round to ${round} `);
//       console.log("tx hash: ", res.hash);
//     } catch (e) {
//       console.error("MPWR Staking error", e);
//     }
//   });



