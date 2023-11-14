import React, { useState,useContext,useEffect } from 'react';

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

  useEffect(()=>{
    // connectWallet()
    checkIfWalletIsConnect()
  },[])

  const handleCreateInvoice = (buyer, invoiceAmount, dueDate, auctionEndTime) => {
    // Implement the logic for creating an invoice
    console.log(`Creating invoice for buyer ${buyer}, amount ${invoiceAmount}`);
    // Update invoice count or other relevant state
  };

  const handleBidOnInvoice = (invoiceId, bidAmount) => {
    // Implement the logic for bidding on an invoice
    console.log(`Bidding ${bidAmount} on invoice ID: ${invoiceId}`);
  };

  const handleCloseInvoiceAuction = (invoiceId) => {
    // Implement the logic for closing an invoice auction
    console.log(`Closing auction for invoice ID: ${invoiceId}`);
    // Update invoice count or other relevant state
  };

  const handleWithdrawFunds = () => {
    // Implement the logic for withdrawing funds
    console.log('Withdrawing funds');
    // Update relevant state
  };

  return (
    <div>
      <h1>Invoice Discounting Platform</h1>
      <InvoiceCreation onCreateInvoice={handleCreateInvoice} />
      <InvoiceBidding onBidOnInvoice={handleBidOnInvoice} />
      <CloseInvoice onCloseInvoiceAuction={handleCloseInvoiceAuction} />
      <WithdrawFunds onWithdrawFunds={handleWithdrawFunds} />
      <InvoiceCount invoiceCount={invoiceCount} />
      { <InvoiceList /> }
    </div>
  );
};

export default App;
