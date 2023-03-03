const { ethers, upgrades } = require("hardhat");

import values from "./arguments/jtrnft"



async function main() {
  const [deployer] = await  ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const contract = await  ethers.getContractFactory("MintingApp");

  // const nft = await upgrades.deployProxy(contract, ["Jupiter", "JTR",add, "https://ipfs.io/ipfs/QmSRRqEcDZK3azRebTngLuMoReoe7VMZWF1BeV9YNmXdTv/", ".json", 4, (1*10**18).toString(), 100 ], { initializer: "initialize" });

  const nft = await  upgrades.deployProxy(contract, [values.Name, values.symbol, values.tokenAddress, values.TOKENURIPREFIX, values.baseExtension, values.maxUserLimit, values.cost, values.maxSupply ], { initializer: "initialize" });


  await nft.deployed();
  console.log("Contract deployed to :", nft.address);

}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.info("check");
    console.error(error);
    process.exit(1);
  });