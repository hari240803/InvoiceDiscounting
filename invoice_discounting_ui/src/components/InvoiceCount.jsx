import React, { useContext, useEffect, useState } from 'react';
import { InvoiceContext } from '../context/InvoiceContext';
import './ID.css';
import InvoiceList from './InvoiceList';

const InvoiceCount = () => {
  const [invoiceCount, setInvoiceCount] = useState(null);
  const [error, setError] = useState('');
  const { InvoicesContract } = useContext(InvoiceContext);
  const [invoices, setInvoices] = useState([]);
  const handleGetInvoiceCount = async () => {
    try {
      setError('');

      // Call the getInvoiceCount function on the smart contract
      const count = await InvoicesContract.getInvoiceCount();
      console.log(count)
      // Update the state with the retrieved invoice count
      setInvoiceCount(count.toNumber()); // Adjust the conversion based on your Solidity data type
      const invoiceDetails = [];
      for (let i = 0; i < count.toNumber(); i++) {
        const [
          supplier,
          buyer,
          invoiceAmount,
          dueDate,
          auctionEndTime,
          highestBid,
          highestBidder,
          closed,
        ] = await InvoicesContract.getInvoiceDetails(i);
  
        // Convert BigNumber to number
        const convertedInvoice = {
          supplier,
          buyer,
          invoiceAmount: invoiceAmount.toNumber(),
          dueDate: dueDate.toNumber(),
          auctionEndTime: auctionEndTime.toNumber(),
          highestBid: highestBid.toNumber(),
          highestBidder,
          closed,
        };
  
        invoiceDetails.push(convertedInvoice);
      }
  
      setInvoices(invoiceDetails);
    }  catch (error) {
      console.error('Error getting invoice count:', error);
      setError(error.message || 'An error occurred while getting the invoice count');
    }
  };

  useEffect(() => {
    // Log the state after it has been updated
    console.log('Updated invoices:', invoices);
  }, [invoices]);

  // const displayInvoiceList = async () => {
  //   try {
  //     setError('');

  //     // Call the getInvoiceCount function on the smart contract to determine the number of invoices
  //     // const count = await InvoicesContract.getInvoiceCount();
  //     // console.log(count)
  //     // setInvoiceCount(count.toNumber())
  //     // Fetch details for each invoice using a loop
  //     const invoiceDetails = [];
  //     for (let i = 0; i < invoiceCount; i++) {
  //       const invoice = await InvoicesContract.getInvoiceDetails(i);
  //       console.log(invoice)
  //       invoiceDetails.push(invoice);
  //     }

  //     setInvoices(invoiceDetails);
  //   } catch (error) {
  //     console.error('Error fetching invoice list:', error);
  //     setError(error.message || 'An error occurred while fetching the invoice list');
  //   }
  // };

  // useEffect(()=>{
  //   displayInvoiceList()
  // },[])

  return (
    <div>
      <h2>Get Invoice List</h2>
      <button onClick={handleGetInvoiceCount}>Get Invoice Count</button>
      {invoiceCount !== null && <div>Invoice Count: {invoiceCount}</div>}
      {
        invoices.length !== 0 && (
          <InvoiceList invoices={invoices} />
        )
      }
      {/*  */}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};


export default InvoiceCount;
