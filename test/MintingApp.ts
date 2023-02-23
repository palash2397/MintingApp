import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { ethers, upgrades } from "hardhat";
import { MerkleTree } from "merkletreejs";
import { soliditySha3 } from "web3-utils";

import values from "../tasks/deploy/arguments/jtrnft";

const truffleAssert = require("truffle-assertions");

describe("Unit Test", () => {
  let token: any, jtrNft: any, admin: SignerWithAddress, user: SignerWithAddress;
  let user1: SignerWithAddress;
  let user2: SignerWithAddress;

  beforeEach(async () => {
    const signers: SignerWithAddress[] = await ethers.getSigners();
    admin = signers[0];
    user = signers[1];
    user1 = signers[2];
    user2 = signers[3];

    const JTRToken = await ethers.getContractFactory("JTRToken");
    token = await JTRToken.deploy();
    await token.deployed();

    const nft = await ethers.getContractFactory("MintingApp");
    // jtrNft = await upgrades.deployProxy(nft, ["Jupiter", "JTR", token.address, "http://ipfs.io/ipfs/", ".json", 4, "1000000000000000000", 17], {
    // initializer: "initialize",
    // });

    jtrNft = await upgrades.deployProxy(
      nft,
      [
        values.Name,
        values.symbol,
        token.address,
        values.TOKENURIPREFIX,
        values.baseExtension,
        values.maxUserLimit,
        values.cost,
        values.maxSupply,
      ],
      {
        initializer: "initialize",
      },
    );
    await jtrNft.deployed();
 
  });

  describe("JTRNFT", () => {
    async function merkleTree() {
      const whitelistAddresses = [soliditySha3(user.address), soliditySha3(user1.address)];
      const merkleTree = new MerkleTree(whitelistAddresses, soliditySha3, { sortPairs: true });
      const rootHash = merkleTree.getHexRoot();
      const claimingAddress = whitelistAddresses[0] || "";
      const hexProof = merkleTree.getHexProof(claimingAddress);
      await jtrNft.setMerkleRoot(rootHash);
      return hexProof;
    }
    it("NFT buy one by one", async () => {
      await token.connect(user).approve(jtrNft.address, "3000000000000000000");
      await token.connect(user).increaseAllowance(jtrNft.address, "5000000000000000000");

      await token.transfer(user.address, "5000000000000000000");
      var tx = await jtrNft.connect(user).buyNFT(await merkleTree(), 1);
      var txn = await tx.wait();
     
      await token.transfer(user.address, "5000000000000000000");
      var tx = await jtrNft.connect(user).buyNFT(await merkleTree(), 1);
      var txn = await tx.wait();

      await token.transfer(user.address, "5000000000000000000");
      var tx = await jtrNft.connect(user).buyNFT(await merkleTree(), 2);
      var txn = await tx.wait();

      await token.transfer(user.address, "5000000000000000000");
      await truffleAssert.reverts(jtrNft.connect(user).buyNFT(await merkleTree(), 1), "buying limit exceeded");
    });

    it("NFT buy two by two", async () => {
      await token.connect(user).approve(jtrNft.address, "3000000000000000000");
      await token.connect(user).increaseAllowance(jtrNft.address, "5000000000000000000");

      await token.transfer(user.address, "5000000000000000000");
      var tx = await jtrNft.connect(user).buyNFT(await merkleTree(), 2);
      var txn = await tx.wait();
      
      await token.transfer(user.address, "5000000000000000000");
      var tx = await jtrNft.connect(user).buyNFT(await merkleTree(), 2);
      var txn = await tx.wait();

      await token.transfer(user.address, "5000000000000000000");
      await truffleAssert.reverts(jtrNft.connect(user).buyNFT(await merkleTree(), 1), "buying limit exceeded");
    });

    it("NFT buy three by three", async () => {
      await token.connect(user).approve(jtrNft.address, "3000000000000000000");
      await token.connect(user).increaseAllowance(jtrNft.address, "5000000000000000000");

      await token.transfer(user.address, "5000000000000000000");
      var tx = await jtrNft.connect(user).buyNFT(await merkleTree(), 3);
      var txn = await tx.wait();
      
      await token.transfer(user.address, "5000000000000000000");
      var tx = await jtrNft.connect(user).buyNFT(await merkleTree(), 1);
      var txn = await tx.wait();

      await token.transfer(user.address, "5000000000000000000");
      await truffleAssert.reverts(jtrNft.connect(user).buyNFT(await merkleTree(), 1), "buying limit exceeded");
    });

    it("NFT buy three by three", async () => {
      await token.connect(user).approve(jtrNft.address, "3000000000000000000");
      await token.connect(user).increaseAllowance(jtrNft.address, "5000000000000000000");

      await token.transfer(user.address, "5000000000000000000");
      var tx = await jtrNft.connect(user).buyNFT(await merkleTree(), 3);
      var txn = await tx.wait();
    
      await token.transfer(user.address, "5000000000000000000");
      var tx = await jtrNft.connect(user).buyNFT(await merkleTree(), 1);
      var txn = await tx.wait();

      await token.transfer(user.address, "5000000000000000000");
      await truffleAssert.reverts(jtrNft.connect(user).buyNFT(await merkleTree(), 1), "buying limit exceeded");
    });

    it("NFT buy four by four", async () => {
      await token.connect(user).approve(jtrNft.address, "3000000000000000000");
      await token.connect(user).increaseAllowance(jtrNft.address, "5000000000000000000");

      await token.transfer(user.address, "5000000000000000000");
      var tx = await jtrNft.connect(user).buyNFT(await merkleTree(), 4);
      var txn = await tx.wait();
     
      await token.transfer(user.address, "5000000000000000000");
      await truffleAssert.reverts(jtrNft.connect(user).buyNFT(await merkleTree(), 1), "buying limit exceeded");
    });

    it("Not whitelisted user", async () => {
      await token.connect(user2).approve(jtrNft.address, "3000000000000000000");
      await token.connect(user2).increaseAllowance(jtrNft.address, "5000000000000000000");

      await token.transfer(user2.address, "5000000000000000000");
      await truffleAssert.reverts(jtrNft.connect(user2).buyNFT(await merkleTree(), 1), "you are not whitelisted");
    });
  });
});
