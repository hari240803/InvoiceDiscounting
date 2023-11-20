import React, { useContext, useState, useEffect } from 'react';
import { InvoiceContext } from '../context/InvoiceContext';

const InvoiceList = ({invoices}) => {
  const { InvoicesContract } = useContext(InvoiceContext);
  // const [invoices, setInvoices] = useState([]);
  const [error, setError] = useState('');

  // const displayInvoiceList = async () => {
  //   try {
  //     setError('');

  //     // Call the getInvoiceCount function on the smart contract to determine the number of invoices
  //     const invoiceCount = await InvoicesContract.getInvoiceCount();

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

  // useEffect(() => {
  //   // Fetch and display the invoice list when the component mounts
  //   displayInvoiceList();
  // }, []);

  return (
    <div>
      <h2>Invoice List</h2>
      {invoices.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Invoice ID</th>
              <th>Supplier</th>
              <th>Buyer</th>
              <th>Invoice Amount</th>
              <th>Due Date</th>
              <th>Auction End Time</th>
              <th>Highest Bid</th>
              <th>Highest Bidder</th>
              <th>Closed</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice, index) => (
              <tr key={index}>
                <td>{index}</td>
                <td>{invoice.supplier}</td>
                <td>{invoice.buyer}</td>
                <td>{invoice.invoiceAmount}</td>
                <td>{invoice.dueDate}</td>
                <td>{invoice.auctionEndTime}</td>
                <td>{invoice.highestBid}</td>
                <td>{invoice.highestBidder}</td>
                <td>{invoice.closed ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No invoices available.</p>
      )}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default InvoiceList;
