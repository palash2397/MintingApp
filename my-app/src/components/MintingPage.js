import React, { useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import PropTypes from 'prop-types';
import { MerkleTree } from "merkletreejs"
import { getMintingCost } from "../web3/mintingApp";
import { approveJTRtoken } from '../web3/mintingApp';
import { ethToWeiConverter } from '../web3/mintingApp';
import { soliditySha3 } from 'web3-utils';
import { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { buyNFT, setRestriction } from '../web3/mintingApp';
import { toast } from 'react-toastify';


const JTR_NFT_CONTRACT_ADDRESS = process.env.REACT_APP_ERC721_TOKEN_CONTRACT_ADDRESS;

const Addresses = ['0x4f02c3102a9d2e1cc0cc97c7fe2429b9b6f5965d',
  '0xF0a83ba20A16A93161262bE2cD71bc4d626C08a0'

];



const MintingPage = () => {
  const wallatAdd = localStorage.getItem('walletAddress')
  const [nftQty, setNftQty] = useState('Select Quantity')
  const [mintCost, setMintCost] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const op = await getMintingCost()
      if (op) setMintCost(op)
    })()


  }, [])


  // buying nft 
  const buyItem = async () => {
    // debugger; // eslint-disable-line no-debugger
    try {
      let nftCostInWei = ethToWeiConverter(mintCost);
      setLoading(true)
      const whitelistAddresses = Addresses.map((val) => soliditySha3(val));
      const merkleTree = new MerkleTree(whitelistAddresses, soliditySha3, { sortPairs: true });
      const rootHash = merkleTree.getHexRoot();
      console.log(rootHash, "root")
      const claimingAddress = soliditySha3(wallatAdd) || "";
      const hexProof = merkleTree.getHexProof(claimingAddress);
      if (merkleTree.verify(hexProof, claimingAddress, rootHash)) {
        await approveJTRtoken(JTR_NFT_CONTRACT_ADDRESS, (nftCostInWei * nftQty).toString(), wallatAdd)
        const result = await buyNFT(hexProof, nftQty, wallatAdd.toString());
        console.log(result);
        toast.success("transaction successfull")
      } else {
        toast.error("you are not whitelisted")

      }

      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)

    }
  }

  const setRestrictionHanddle = async () => {
    // debugger; // eslint-disable-line no-debugger
    try {
      setLoading(true)
      await setRestriction(wallatAdd)
      toast.success("transaction successfull")
      setLoading(false)

    } catch (error) {
      console.log(error)
      toast.error(error)
      setLoading(false)


    }
  }


  return (

    <>
      <div className='minting_wrp w-25'>
        <h2 className='main-heading'>Jupiter NFT cost </h2>
        <h2 className='main-heading'>{mintCost * (nftQty == "Select Quantity" ? 0 : nftQty)} JTR </h2>
        <Dropdown className="d-inline mx-2 ">
          <Dropdown.Toggle id="dropdown-autoclose-true">
            {nftQty}
          </Dropdown.Toggle>
          {loading ? <div className='loader'>
            <Spinner animation="grow" variant="danger" />

          </div> : ""}

          <Dropdown.Menu>
            <Dropdown.Item href="#" onClick={() => setNftQty('1')}>1</Dropdown.Item>
            <Dropdown.Item href="#" onClick={() => setNftQty('2')} >2</Dropdown.Item>
            <Dropdown.Item href="#" onClick={() => setNftQty('3')}>3</Dropdown.Item>
            <Dropdown.Item href="#" onClick={() => setNftQty('4')}>4</Dropdown.Item>

          </Dropdown.Menu>
        </Dropdown>

      </div>
      <Button variant="success" className='mt-4 mint-btn' onClick={buyItem}>Buy NFT</Button>{' '}
      <Button variant="dark" className='connect_btn_restrict' onClick={setRestrictionHanddle} >Restrict </Button>{' '}

    </>
  )
}
MintingPage.propTypes = {
  connectWalletHandle: PropTypes.func

}
export default MintingPage;