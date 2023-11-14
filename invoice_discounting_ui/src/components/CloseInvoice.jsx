import React, { useContext,useState } from 'react';
import { InvoiceContext } from '../context/InvoiceContext';

const CloseInvoice = () => {
  const [invoiceId,setInvoiceId] = useState('');

  const {InvoicesContract}  = useContext(InvoiceContext)
  const handleCloseInvoice = async() => {
    await InvoicesContract.closeInvoiceAuction(invoiceId);
    await InvoicesContract.on('InvoiceClosed',(invoiceId, highestBidder, supplierAmount)=>{
      console.log(invoiceId)
      console.log(highestBidder)
      console.log(supplierAmount)
    })
      await InvoicesContract.on('InvoiceClosed',(invoiceId, address)=>{
        console.log(invoiceId)
        console.log(address)

    })
    setInvoiceId('');
  };

  return (
    <div>
      <h2>Close Invoice Auction</h2>
      <label>Invoice ID: </label>
      <input type="text" value={invoiceId} onChange={(e) => setInvoiceId(e.target.value)} /><br />
      <button onClick={handleCloseInvoice}>Close Invoice Auction</button>
    </div>
  );
};

export default CloseInvoice;
