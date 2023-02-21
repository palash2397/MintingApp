
const { ethers, upgrades } = require("hardhat");

const proxy1 = "0x32B2f46930fE22A424152a882A321194eE501040"; //


async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const contract = await ethers.getContractFactory("MintingApp");

  const JTR = await upgrades.upgradeProxy(proxy1,contract);
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