import React from 'react';

const InvoiceCount = ({ invoiceCount }) => {
  return (
    <div>
      <h2>Invoice Count</h2>
      <p>Total Invoices: {invoiceCount}</p>
    </div>
  );
};

export default InvoiceCount;
