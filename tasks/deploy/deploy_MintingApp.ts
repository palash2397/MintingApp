const { ethers, upgrades } = require("hardhat");
const receiver = "0xb178512aA2C4D0c3C43a12c7b7C2d1465fe298A5";

const add = "0x2E1406A84A5118D53Dc7b2D4CAE0c5E9c9696fBe"; //JTR token address

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const contract = await ethers.getContractFactory("MintingApp");

  const nft = await upgrades.deployProxy(
    contract,
    [
      "Jupiter",
      "JTR",
      add,
      "https://ipfs.io/ipfs/QmSRRqEcDZK3azRebTngLuMoReoe7VMZWF1BeV9YNmXdTv/",
      ".json",
      4,
      (1 * 10 ** 18).toString(),
      100,
    ],
    { initializer: "initialize" },
  );

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
