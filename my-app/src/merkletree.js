
// import keccak256 from 'keccak256';
import { MerkleTree } from "merkletreejs"
//import { sha256 } from 'ethers/lib/utils.js';
const sha256 = require('ethers/lib/utils.js')

// export const createMarkleTree = () => {
// const address = [

//   '0x4F02C3102A9D2e1cC0cC97c7fE2429B9B6F5965D',
//   '0xe1ac3d06cada057c57c8c6862fb1ad2cd60622cf',
// ];
// const leavesNodeArray = address.map((address) => keccak256(address));
// const merkleTree = new MerkleTree(leavesNodeArray, sha256, {
//   sortPairs: true,
// });
// const merkleTreeRootHash = merkleTree.getHexRoot();
// console.log(merkleTreeRootHash, "--roothash")
// const validationAddressLeaf = keccak256(address[0]);
// const merkleTreeProof = merkleTree.getProof(validationAddressLeaf);
// console.log("string", merkleTreeProof)
// console.log(
//   merkleTree.verify(
//     merkleTreeProof,
//     validationAddressLeaf,
//     merkleTreeRootHash,
//   ),
// );
// console.log(merkleTreeRootHash);
// };

// createMarkleTree();

//export default createMarkleTree


async function merkleTree() {
  const whitelistAddresses = ['0x4F02C3102A9D2e1cC0cC97c7fE2429B9B6F5965D',
    '0xF0a83ba20A16A93161262bE2cD71bc4d626C08a0',
    '0xb178512aA2C4D0c3C43a12c7b7C2d1465fe298A5',
    "0xB00Af9fd043CA06039fBc8c2Ca27559006606CA9"

  ];
  const merkleTree = new MerkleTree(whitelistAddresses, sha256, { sortPairs: true });
  const rootHash = merkleTree.getHexRoot();
  console.log("Whitelist Merkle Tree\n", merkleTree.toString());
  console.log("Root Hash: ", rootHash);
  const claimingAddress = whitelistAddresses[1] || "";
  //const claimingAddress= ['0x4F02C3102A9D2e1cC0cC97c7fE2429B9B6F5965D'];
  const hexProof = merkleTree.getHexProof(claimingAddress);
  console.log("proof", hexProof);
  // await contract.setMerkleRoot(rootHash);
  // console.log(hexProof)
  // return hexProof;
}

merkleTree()