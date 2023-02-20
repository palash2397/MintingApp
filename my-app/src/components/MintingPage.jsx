import React from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

import { useState } from 'react';
import { connectWallet } from '../web3/walletMothods';
//import { string } from 'hardhat/internal/core/params/argumentTypes';

const MintingPage = (prop) => {

    
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
      <Button variant="success" className='mt-4 mint-btn'>Buy NFT</Button>{' '}

    </div>
  )
}

export default MintingPage;