// 1. Import libraries. Use `npm` package manager to install
import { MerkleTree } from "merkletreejs";
import { soliditySha3 } from "web3-utils";

const whitelistAddresses = [
  soliditySha3("0x4F02C3102A9D2e1cC0cC97c7fE2429B9B6F5965D"),
  soliditySha3("0xF0a83ba20A16A93161262bE2cD71bc4d626C08a0"),
];


const merkleTree = new MerkleTree(whitelistAddresses, soliditySha3, { sortPairs: true });

const rootHash = merkleTree.getHexRoot();
console.log("Whitelist Merkle Tree\n", merkleTree.toString());
console.log("Root Hash: ", rootHash);

const claimingAddress = whitelistAddresses[0] || "";
 console.log("claimingAddress", claimingAddress)

const hexProof = merkleTree.getHexProof(claimingAddress);
console.log(hexProof);


console.log(merkleTree.verify(hexProof, claimingAddress, rootHash));
