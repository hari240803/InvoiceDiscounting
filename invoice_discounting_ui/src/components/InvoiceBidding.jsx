import React, { useContext,useState } from 'react';
import { InvoiceContext } from '../context/InvoiceContext';

const InvoiceBidding = () => {
  const {InvoicesContract}  = useContext(InvoiceContext)
  const [invoiceId, setInvoiceId] = useState('');
  const [bidAmount, setBidAmount] = useState('');
  const [invoiceid,setInvoiceid] = useState(null);
  const [bidamount,setBidamount] = useState(null);

  const handleBidOnInvoice = async() => {
    // Perform input validation here if needed
    await InvoicesContract.bidOnInvoice(invoiceId, bidAmount);
    await InvoicesContract.on('InvoiceBidding',(invoiceid, sender, bidAmount)=>{
      console.log(invoiceid)
      console.log(sender)
      console.log(bidAmount)
     
    })
    setInvoiceId('');
    setBidAmount('');
  };

  return (
    <div>
      <h2>Bid on Invoice</h2>
      <label>Invoice ID: </label>
      <input type="text" value={invoiceId} onChange={(e) => setInvoiceId(e.target.value)} /><br />
      <label>Bid Amount: </label>
      <input type="text" value={bidAmount} onChange={(e) => setBidAmount(e.target.value)} /><br />
      <button onClick={handleBidOnInvoice}>Bid on Invoice</button>
      <div>
        {
          invoiceid!=null && bidamount !=null &&
          <p>Invoice Id : {invoiceid}  with highest bid amount : {bidamount}</p>
        }
      </div>
    </div>
  );
};

export default InvoiceBidding;
