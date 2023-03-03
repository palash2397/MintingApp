
   const { ethers, upgrades } = require("hardhat");
   import values from "./arguments/jtrnft"
// //  import { ethers, upgrades } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const contract = await ethers.getContractFactory("MintingApp");

  const JTR = await upgrades.upgradeProxy(values.proxy,contract);
  await JTR.deployed();
  console.log("Contract deployed to :", JTR.address);


}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.info("check");
    console.error(error);
    process.exit(1);
  });