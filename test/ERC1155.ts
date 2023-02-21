// import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
// import { doesNotMatch } from "assert";
// import { expect } from "chai";
// import { ethers } from "hardhat";
// import { any } from "hardhat/internal/core/params/argumentTypes";
// import { connect } from "http2";
// import { isConditionalExpression } from "typescript";

// const { expectRevert, expectEvent } = require("@openzeppelin/test-helpers");

// const truffleAssert = require("truffle-assertions");

// describe("unit test", () => {
//   let admin: SignerWithAddress, user: SignerWithAddress, user1: SignerWithAddress;
//   let ERCcontract: any;
//   beforeEach(async () => {
//     const signers: SignerWithAddress[] = await ethers.getSigners();
//     admin = signers[0];
//     user = signers[1];
//     user1 = signers[2];

//     const nftcontract = await ethers.getContractFactory("MyToken");
//     ERCcontract = await nftcontract.deploy((0.3 * 10 ** 18).toString(), 100, (0.1 * 10 ** 18).toString(), 2, 4);
//     await ERCcontract.deployed();

//     await ERCcontract.setPrimeList([user1.address]);
//   });

//   describe("Minting ERC1155", () => {
//     it("Public Minting token one by one", async () => {
//       var tx = await ERCcontract.connect(user).publicMint(1, 1, { value: (1 * (0.3 * 10 ** 18)).toString() });
//       var txn = await tx.await;

//       var tx = await ERCcontract.connect(user).publicMint(1, 3, { value: (3 * (0.3 * 10 ** 18)).toString() });
//       var txn = await tx.await;

//       await truffleAssert.reverts(
//         ERCcontract.connect(user).publicMint(1, 1, { value: (1 * (0.3 * 10 ** 18)).toString() }),
//         "buying limit exceeded",
//       );
//     });

//     it("Public Minting token two two", async () => {
//       var tx = await ERCcontract.connect(user).publicMint(1, 2, { value: (2 * (0.3 * 10 ** 18)).toString() });
//       var txn = await tx.await;

//       var tx = await ERCcontract.connect(user).publicMint(1, 2, { value: (2 * (0.3 * 10 ** 18)).toString() });
//       var txn = await tx.await;

//       await truffleAssert.reverts(
//         ERCcontract.connect(user).publicMint(1, 1, { value: (1 * (0.3 * 10 ** 18)).toString() }),
//         "buying limit exceeded",
//       );
//     });

//     it("Prime  Minting token one one", async () => {
//       var tx = await ERCcontract.connect(user1).primeMint(1, 1, { value: (1 * (0.1 * 10 ** 18)).toString() });
//       var txn = await tx.await;

//       var tx = await ERCcontract.connect(user1).primeMint(1, 3, { value: (3 * (0.1 * 10 ** 18)).toString() });
//       var txn = await tx.await;

//       await truffleAssert.reverts(
//         ERCcontract.connect(user1).primeMint(1, 1, { value: (1 * (0.1 * 10 ** 18)).toString() }),
//         "buying limit exceeded",
//       );
//     });

//     it("Prime  Minting token two two", async () => {
//       var tx = await ERCcontract.connect(user1).primeMint(2, 2, { value: (2 * (0.1 * 10 ** 18)).toString() });
//       var txn = await tx.await;
//       var tx = await ERCcontract.connect(user1).primeMint(2, 2, { value: (2 * (0.1 * 10 ** 18)).toString() });
//       var txn = await tx.await;

//       await truffleAssert.reverts(
//         ERCcontract.connect(user1).primeMint(2, 1, { value: (1 * (0.1 * 10 ** 18)).toString() }),
//         "buying limit exceeded",
//       );
//     });
//   });
// });
