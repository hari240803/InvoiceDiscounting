import React from 'react';

const InvoiceList = ({ invoices }) => {
  return (
    <div>
      <h2>Invoice List</h2>
      <ul>
        {invoices && invoices.map((invoice) => (
          <li key={invoice.id}>
            <p>Invoice ID: {invoice.id}</p>
            <p>Supplier: {invoice.supplier}</p>
            <p>Buyer: {invoice.buyer}</p>
            <p>Invoice Amount: {invoice.invoiceAmount}</p>
            <p>Due Date: {invoice.dueDate}</p>
            <p>Auction End Time: {invoice.auctionEndTime}</p>
            <p>Highest Bid: {invoice.highestBid}</p>
            <p>Highest Bidder: {invoice.highestBidder}</p>
            <p>Closed: {invoice.closed ? 'Yes' : 'No'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InvoiceList;
