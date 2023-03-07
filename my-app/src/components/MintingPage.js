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
import { buyNFT, setRestriction, getOwner, getUserMaxLimit } from '../web3/mintingApp';
import { toast } from 'react-toastify';
const JTR_NFT_CONTRACT_ADDRESS = process.env.REACT_APP_ERC721_TOKEN_CONTRACT_ADDRESS;


// whitelisted users
const Addresses = ['0x4f02c3102a9d2e1cc0cc97c7fe2429b9b6f5965d',
  '0xF0a83ba20A16A93161262bE2cD71bc4d626C08a0'

];

const MintingPage = () => {
  const wallatAdd = localStorage.getItem('walletAddress')
  const [nftQty, setNftQty] = useState('Select Quantity') // dynamic nft qty
  const [mintCost, setMintCost] = useState(1); // dynmic mintcost
  const [loading, setLoading] = useState(false); // loader
  const [options, setOptions] = useState([]);  // dynamic dropdown


  useEffect(() => {
    (async () => {
      const op = await getMintingCost()
      if (op) setMintCost(op)
    })()
  }, [])

  useEffect(() => {
    (async () => {
      const rs = await getUserMaxLimit()
      if (rs) { setOptions([rs]) }
    })()
  }, [])


  let temp = [];
  for (let i = 1; i <= options; i++) {
    temp.push(i)

  }

  // buying nft 
  const buyItem = async () => {
    // debugger; // eslint-disable-line no-debugger
    try {
      let nftCostInWei = ethToWeiConverter(mintCost);
      setLoading(true)
      const whitelistAddresses = Addresses.map((val) => soliditySha3(val));
      const merkleTree = new MerkleTree(whitelistAddresses, soliditySha3, { sortPairs: true });
      const rootHash = merkleTree.getHexRoot();
      console.log(rootHash, "root")  // root hash
      const claimingAddress = soliditySha3(wallatAdd) || "";   // address hash 
      const hexProof = merkleTree.getHexProof(claimingAddress);
      if (merkleTree.verify(hexProof, claimingAddress, rootHash)) {
        await approveJTRtoken(JTR_NFT_CONTRACT_ADDRESS, (nftCostInWei * nftQty).toString(), wallatAdd)  // token approve method
        const result = await buyNFT(hexProof, nftQty, wallatAdd.toString());   // buy nft method
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


  // setting restriction
  const setRestrictionHanddle = async () => {
    let rest = await getOwner()
    if (wallatAdd == rest.toLowerCase()) {
      setLoading(true)
      await setRestriction(wallatAdd)
      toast.success("transaction successfull")
      setLoading(false)
    } else {
      toast.error("you are not a owner")
      setLoading(false)
    }
  }

  return (
    <>
      <div className='minting_wrp w-25 minting-div' >
        <div>
          <h2 className='main-heading'>Jupiter NFT cost </h2><br />
          <h2 className='main-heading'>{mintCost * (nftQty == "Select Quantity" ? 0 : nftQty)} JTR </h2>
        </div>
        <Dropdown className="d-inline mx-2 ">
          <Dropdown.Toggle id="dropdown-autoclose-true">
            {nftQty}
          </Dropdown.Toggle>
          {loading ? <div className='loader'>
            <Spinner animation="grow" variant="danger" />
          </div> : ""}

          <Dropdown.Menu>
            {
              temp.map((value, index) => {
                return <Dropdown.Item href="#" key={index} onClick={() => setNftQty(value)} >{value}</Dropdown.Item>
              })
            }
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