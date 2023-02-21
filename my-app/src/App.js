import "./App.css";
import MintingPage from "./components/MintingPage";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { connectWallet } from './web3/walletMothods';
const REACT_APP_NETWORK_ID = process.envREACT_APP_NETWORK_ID
const REACT_APP_ETHEREUM_NETWORK_ID_IN_HEX = process.env.REACT_APP_ETHEREUM_NETWORK_ID_IN_HEX


function App(prop) {
  const [wallet, setwallet] = useState({
    walletAddress: "",
    networkID: "",
    isActive: false
  });
  const [logout, setLogut] = useState(false)

  const connectWalleHandle = async () => {
    try {
      const { walletAddress, networkID } = await connectWallet(REACT_APP_NETWORK_ID, REACT_APP_ETHEREUM_NETWORK_ID_IN_HEX)
      setwallet((value) => ({ ...value, walletAddress: walletAddress, networkID: networkID }))
      console.log(walletAddress, networkID)
      localStorage.setItem("walletAddress", walletAddress)
      localStorage.setItem("networkID", networkID)

      setLogut(true)

    } catch (error) {
      console.log(error)

    }

  }

  return (
    <div className="App">
      <header className="App-header">
        <MintingPage logout={logout} connectWalleHandle={connectWalleHandle} />
        
      </header>
    </div>
  );
}

export default App;
