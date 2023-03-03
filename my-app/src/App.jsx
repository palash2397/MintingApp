import "./App.css";
import MintingPage from "./components/MintingPage";
import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { connectWallet } from './web3/walletMothods';
import { toast } from "react-toastify";
const REACT_APP_NETWORK_ID = process.env.REACT_APP_NETWORK_ID
const REACT_APP_ETHEREUM_NETWORK_ID_IN_HEX = process.env.REACT_APP_ETHEREUM_NETWORK_ID_IN_HEX


function App() {
  const [walletConnect , setWalletConnect] = useState(false)

  const connectWalletHandle = async () => {
    try {

      const { walletAddress, networkID } = await connectWallet(REACT_APP_NETWORK_ID, REACT_APP_ETHEREUM_NETWORK_ID_IN_HEX)

      console.log(walletAddress, networkID)
      localStorage.setItem("walletAddress", walletAddress)
      localStorage.setItem("networkID", networkID)

      setWalletConnect(true)
      toast.success("wallet connected")


    } catch (error) {
      console.log(error)

    }

  }

  return (
    <>
      <div className="App">
        <header className="App-header">
        <Button variant="warning" className='connect_btn ' onClick={connectWalletHandle} >{walletConnect? "connected":"connect"} </Button>{' '}
          <MintingPage/>

        </header>

      </div>
    </>
  );
}

export default App;
