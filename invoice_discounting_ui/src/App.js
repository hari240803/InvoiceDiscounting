import React, { useState,useContext,useEffect } from 'react';
/* global invoices */
import CloseInvoice from './components/CloseInvoice';
import WithdrawFunds from './components/WithdrawFunds';
import InvoiceCount from './components/InvoiceCount';
import InvoiceList from './components/InvoiceList';
import InvoiceCreation from './components/InvoiceCreation';
import InvoiceBidding from './components/InvoiceBidding';
import { InvoiceContext } from './context/InvoiceContext';


const App = () => {
  // State variables or functions for handling actions
  const [invoiceCount, setInvoiceCount] = useState(0);
  const {checkIfWalletIsConnect,connectWallet,currentAccount} = useContext(InvoiceContext)
  
  const [error, setError] = useState('');
  const { InvoicesContract } = useContext(InvoiceContext);

  useEffect(()=>{
    // connectWallet()
    checkIfWalletIsConnect()
  },[])



  const handleBidOnInvoice = (invoiceId, bidAmount) => {
   
    console.log(`Bidding ${bidAmount} on invoice ID: ${invoiceId}`);
  };

  const handleCloseInvoiceAuction = (invoiceId) => {
   
    console.log(`Closing auction for invoice ID: ${invoiceId}`);
   
  };
  
  const handleCreateInvoice = (buyer, invoiceAmount, dueDate, auctionEndTime) => {

        console.log(`Creating invoice for buyer ${buyer}, amount ${invoiceAmount}`);
        
  };

  const handleWithdrawFunds = () => {
    console.log('Withdrawing funds');
   
  };

  return (

    <div>
      <h1>Invoice Discounting Platform</h1>
      <InvoiceCreation onCreateInvoice={handleCreateInvoice} />
      <InvoiceCount  />
      <InvoiceBidding onBidOnInvoice={handleBidOnInvoice} />
      <CloseInvoice onCloseInvoiceAuction={handleCloseInvoiceAuction} />
      {/* <WithdrawFunds onWithdrawFunds={handleWithdrawFunds} /> */}
     
      {/* <InvoiceList invoicelist = {invoices} />  */}
    </div>

  );
};

export default App;
