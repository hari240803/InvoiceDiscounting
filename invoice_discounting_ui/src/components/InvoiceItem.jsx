import React, { useState } from 'react';
import BidForm from './BidForm';

function InvoiceItem({ invoice, onBid }) {
  const [showBidForm, setShowBidForm] = useState(false);

  const handleBidClick = () => {
    setShowBidForm(true);
  };

  return (
    <div>
      <h3>Invoice #{invoice.id}</h3>
      <p>Amount: {invoice.amount}</p>
      <p>Due Date: {invoice.dueDate}</p>
      <p>Highest Bid: {invoice.highestBid}</p>
      {!invoice.closed && (
        <button onClick={handleBidClick}>Bid on Invoice</button>
      )}
      {showBidForm && <BidForm invoiceId={invoice.id} onBid={onBid} />}
    </div>
  );
}

export default InvoiceItem;
