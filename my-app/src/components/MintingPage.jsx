import React from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

import { useState } from 'react';
import { connectWallet } from '../web3/walletMothods';
//import { string } from 'hardhat/internal/core/params/argumentTypes';



const MintingPage = () => {
  const[wallet, setwallet]=useState({
    walletAddress:"",
    networkID:"",
    isActive:false
  });

  const connectWalleHandle= async()=>{
    const { walletAddress, networkID }= await connectWallet()
    setwallet((value)=> ({...value, walletAddress : walletAddress , networkID: networkID}))
    }
    
  return (
    <div className='minting_wrp w-25'>
     <Button variant="warning" className='connect_btn' onClick={connectWalleHandle} >connect </Button>{' '}
     <h2>Prime minting cost</h2>
     <h2>Minting cost</h2>
        
     <InputGroup size="sm">
        <Form.Control
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
        />
      </InputGroup>
    </div>
  )
}

export default MintingPage;