import React, { useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import PropTypes from 'prop-types';
import { MerkleTree } from "merkletreejs"
//import { sha256 } from 'ethers/lib/utils.js';
import { getMintingCost } from "../web3/mintingApp"
//import {weiToEthConverter} from "../web3/mintingApp";
import { soliditySha3 } from 'web3-utils';
import { useState } from 'react';
import { buyNFT } from '../web3/mintingApp';
//import { keccak256 } from 'web3-utils';
//import { string } from 'hardhat/internal/core/params/argumentTypes';
const wallatAdd = localStorage.getItem('walletAddress')

const Addresses = ['0x4f02c3102a9d2e1cc0cc97c7fe2429b9b6f5965d',
  '0xF0a83ba20A16A93161262bE2cD71bc4d626C08a0',
  '0xb178512aA2C4D0c3C43a12c7b7C2d1465fe298A5',
  '0xB00Af9fd043CA06039fBc8c2Ca27559006606CA9'
];



const MintingPage = ({ connectWalletHandle }) => {
  const [nftQty, setNftQty] = useState('Select Quantity')
  const [mintCost, setMintCost] = useState(1);

  useEffect(() => {
    (async () => {
      const op = await getMintingCost()
      if (op) setMintCost(op)
    })()


  }, [])

  const buyItem = async () => {
    try {

      // const merkleTree = whitelistAddresses.map((x) => sha256(x))
      // const tree = new MerkleTree(merkleTree, sha256, { sortPairs: true })
      // const leaf = sha256("0xB00Af9fd043CA06039fBc8c2Ca27559006606CA9")
      // const proof = tree.getProof(leaf)
      // //  localStorage.setItem("prof",JSON.stringify(proof))
      // debugger
      // const result = await buyNFT(proof, '0.0001', '1', wallatAdd.toString());
      // console.log(result, '---');



      // const leavesNodeArray = whitelistAddresses.map((address) => keccak256(address));
      // const merkleTree = new MerkleTree(leavesNodeArray, sha256, {
      //   sortPairs: true,
      // });
      // const merkleTreeRootHash = merkleTree.getHexRoot();
      // const validationAddressLeaf = keccak256(wallatAdd);
      // const merkleTreeProof = merkleTree.getHexProof(validationAddressLeaf);
      // const merkleTree = new MerkleTree(whitelistAddresses, sha256, { sortPairs: true });
      // const rootHash = merkleTree.getHexRoot();
      // // console.log("Whitelist Merkle Tree\n", merkleTree.toString());
      // // console.log("Root Hash: ", rootHash);


      // const claimingAddress = wallatAdd;
      //const claimingAddress= ['0x4F02C3102A9D2e1cC0cC97c7fE2429B9B6F5965D'];
      // const hexProof = merkleTree.getHexProof(claimingAddress);
      // console.log("proof", hexProof)
      // console.log(
      //   "rooot", merkleTreeRootHash,
      //   merkleTree.verify(
      //     merkleTreeProof,
      //     validationAddressLeaf,
      //     merkleTreeRootHash,
      //   ),
      // );

      const whitelistAddresses = [soliditySha3(wallatAdd), soliditySha3(Addresses[1])];
      const merkleTree = new MerkleTree(whitelistAddresses, soliditySha3, { sortPairs: true });
      const rootHash = merkleTree.getHexRoot();
      // console.log("Whitelist Merkle Tree\n", merkleTree.toString());
      console.log("Root Hash: ", rootHash);
      const claimingAddress = whitelistAddresses[0] || "";
     // console.log("claimingAddress", claimingAddress)

      const hexProof = merkleTree.getHexProof(claimingAddress);
     // console.log(hexProof);

      console.log(merkleTree.verify(hexProof, claimingAddress, rootHash));

      const result = await buyNFT(hexProof, nftQty, wallatAdd.toString());
      console.log(result, '---');
    } catch (error) {
      console.error(error)

    }
  }

  return (
    <>
      <div className='minting_wrp w-25'>
        <Button variant="warning" className='connect_btn ' onClick={connectWalletHandle} >connect </Button>{' '}
        <h2 className='main-heading'>Jupiter NFT cost </h2>
        <h2 className='main-heading'>{mintCost * nftQty} JTR </h2>
        <Dropdown className="d-inline mx-2">
          <Dropdown.Toggle id="dropdown-autoclose-true">
            {nftQty}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#" onClick={() => setNftQty('1')}>1</Dropdown.Item>
            <Dropdown.Item href="#" onClick={() => setNftQty('2')} >2</Dropdown.Item>
            <Dropdown.Item href="#" onClick={() => setNftQty('3')}>3</Dropdown.Item>
            <Dropdown.Item href="#" onClick={() => setNftQty('4')}>4</Dropdown.Item>

          </Dropdown.Menu>
        </Dropdown>

      </div>
      <Button variant="success" className='mt-4 mint-btn' onClick={buyItem}>Buy NFT</Button>{' '}
    </>
  )
}
MintingPage.propTypes = {
  connectWalletHandle: PropTypes.func

}
export default MintingPage;