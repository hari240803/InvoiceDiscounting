import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

export const InvoiceContext = React.createContext();

const { ethereum } = window;
let InvoicesContract;

// const createEthereumContract = () => {
//   const provider = new ethers.providers.Web3Provider(ethereum);
//   const signer = provider.getSigner();
//   const InvoicesContract = new ethers.Contract(contractAddress, contractABI, signer);

//   return InvoicesContract;
// };

export const InvoicesProvider = ({ children }) => {
//   const [formData, setformData] = useState({ addressTo: "", amount: "", keyword: "", message: "" });
  const [currentAccount, setCurrentAccount] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [InvoiceCount, setInvoiceCount] = useState(localStorage.getItem("InvoiceCount"));
//   const [Invoices, setInvoices] = useState([]);

//   const handleChange = (e, name) => {
//     setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
//   };

//   const getAllInvoices = async () => {
//     try {
//       if (ethereum) {
//         const InvoicesContract = createEthereumContract();

//         const availableInvoices = await InvoicesContract.getAllInvoices();

//         const structuredInvoices = availableInvoices.map((Invoice) => ({
//           addressTo: Invoice.receiver,
//           addressFrom: Invoice.sender,
//           timestamp: new Date(Invoice.timestamp.toNumber() * 1000).toLocaleString(),
//           message: Invoice.message,
//           keyword: Invoice.keyword,
//           amount: parseInt(Invoice.amount._hex) / (10 ** 18)
//         }));

//         console.log(structuredInvoices);

//         setInvoices(structuredInvoices);
//       } else {
//         console.log("Ethereum is not present");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        console.log("Wallet is connected")
        // getAllInvoices();
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
    }
  };

//   const checkIfInvoicesExists = async () => {
//     try {
//       if (ethereum) {
//         const InvoicesContract = createEthereumContract();
//         const currentInvoiceCount = await InvoicesContract.getInvoiceCount();

//         window.localStorage.setItem("InvoiceCount", currentInvoiceCount);
//       }
//     } catch (error) {
//       console.log(error);

//       throw new Error("No ethereum object");
//     }
//   };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_requestAccounts", });

      setCurrentAccount(accounts[0]);
      window.location.reload();
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

//   const sendInvoice = async () => {
//     try {
//       if (ethereum) {
//         const { addressTo, amount, keyword, message } = formData;
//         const InvoicesContract = createEthereumContract();
//         const parsedAmount = ethers.utils.parseEther(amount);

//         await ethereum.request({
//           method: "eth_sendInvoice",
//           params: [{
//             from: currentAccount,
//             to: addressTo,
//             gas: "0x5208",
//             value: parsedAmount._hex,
//           }],
//         });

//         const InvoiceHash = await InvoicesContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

//         setIsLoading(true);
//         console.log(`Loading - ${InvoiceHash.hash}`);
//         await InvoiceHash.wait();
//         console.log(`Success - ${InvoiceHash.hash}`);
//         setIsLoading(false);

//         const InvoicesCount = await InvoicesContract.getInvoiceCount();

//         setInvoiceCount(InvoicesCount.toNumber());
//         window.location.reload();
//       } else {
//         console.log("No ethereum object");
//       }
//     } catch (error) {
//       console.log(error);

//       throw new Error("No ethereum object");
//     }
//   };

  useEffect(() => {
    checkIfWalletIsConnect();
    // checkIfInvoicesExists();
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    InvoicesContract = new ethers.Contract(contractAddress, contractABI, signer);
  }, []);

  return (
    <InvoiceContext.Provider
      value={{
        connectWallet,
        currentAccount,
        checkIfWalletIsConnect,
        InvoicesContract
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};