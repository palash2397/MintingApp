import { sha256 } from "ethers/lib/utils";
import keccak256 from "keccak256";
import MerkleTree from "merkletreejs";

export const createMarkleTree = dataArray => {
  const address = ["0x72bbf929a9c4fa6c77cbf385a52b822d3e974c71", "0xe1ac3d06cada057c57c8c6862fb1ad2cd60622cf"];
  const leavesNodeArray = address.map(address => keccak256(address));
  const merkleTree = new MerkleTree(leavesNodeArray, sha256, {
    sortPairs: true,
  });
  const merkleTreeRootHash = merkleTree.getHexRoot();
  const validationAddressLeaf = keccak256(address[0]);
  const merkleTreeProof = merkleTree.getProof(validationAddressLeaf);
  console.log(merkleTree.verify(merkleTreeProof, validationAddressLeaf, merkleTreeRootHash));
  console.log(merkleTreeRootHash);
};
