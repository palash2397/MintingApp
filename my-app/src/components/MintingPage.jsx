import React from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

import { useState } from 'react';
import { connectWallet } from '../web3/walletMothods';
import { buyNFT } from '../web3/mintingApp';
//import { string } from 'hardhat/internal/core/params/argumentTypes';
const wallatAdd=localStorage.getItem('walletAddress')

const whitelistAddresses = ['0x4F02C3102A9D2e1cC0cC97c7fE2429B9B6F5965D',
     '0xF0a83ba20A16A93161262bE2cD71bc4d626C08a0',
     '0xb178512aA2C4D0c3C43a12c7b7C2d1465fe298A5',
     "0xB00Af9fd043CA06039fBc8c2Ca27559006606CA9"

     ];

const MintingPage = (prop) => {
const buyItem=async()=>{
  const leaves = ['a', 'b', 'c'].map(x => SHA256(x))
  const tree = new MerkleTree(leaves, SHA256)
  const leaf = SHA256(localStorage.getItem("address"))
  const proof = tree.getProof(leaf)
const result=await buyNFT("",'0.0001','1',wallatAdd);
console.log(result,'---');
}
    
  return (
    <div className='minting_wrp w-25'>
     <Button variant="warning" className='connect_btn ' onClick={prop.connectWalleHandle} >connect </Button>{' '}
    
     <h2 className='main-heading'>Minting cost</h2>
        
     <InputGroup size="sm">
        <Form.Control
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
        />
      </InputGroup>
      <Button variant="success" className='mt-4 mint-btn' onClick={buyItem}>Buy NFT</Button>{' '}

    </div>
  )
}

export default MintingPage;