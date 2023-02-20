import JTR_TOKEN_CONTRACT_ABI from "../smart-contracts/contract_abi/JTRtoken.json";
import ERC721_TOKEN_CONTRACT_ABI from "../smart-contracts/contract_abi/Minting_App.json";
import Web3 from "web3";

const ERC721_TOKEN_CONTRACT_ADDRESS = process.env.REACT_APP_ERC721_TOKEN_CONTRACT_ADDRESS;
const JTR_TOKEN_ADDRESS = process.env.REACT_APP_JTR_TOKEN_CONTRACT_ADDRESS;

export const getWeb3Provider = () => {
  return new Promise(async (resolve, reject) => {
    if (window.ethereum) {
      try {
        const web3 = new Web3(window.ethereum);
        resolve({ web3 });
      } catch (error) {
        reject(error);
      }
    } else if (window.web3) {
      try {
        const web3 = window.web3;
        resolve({ web3 });
      } catch (error) {
        reject(error);
      }
    } else {
      try {
        const provider = new Web3.providers.HttpProvider(process.env.NEXT_PUBLIC_INFURA_PROVIDER_URL);
        const web3 = new Web3(provider);
        resolve({ web3 });
      } catch (error) {
        reject(error);
      }
    }
  });
};

export const getContractInstance = async contractName => {
  const { web3 } = await getWeb3Provider();
  let abi;
  let contractAddress;

  switch (contractName) {
    case "Minting App":
      abi = ERC721_TOKEN_CONTRACT_ABI;
      contractAddress = ERC721_TOKEN_CONTRACT_ADDRESS;
      break;
    default:
      abi = JTR_TOKEN_CONTRACT_ABI;
      contractAddress = JTR_TOKEN_ADDRESS;
  }

  const JTRTokenContract = new web3.eth.Contract(abi, contractAddress);
  return JTRTokenContract;
};
