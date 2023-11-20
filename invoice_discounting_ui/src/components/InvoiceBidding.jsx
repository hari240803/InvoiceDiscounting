import React, { useContext,useState } from 'react';
import { InvoiceContext } from '../context/InvoiceContext';
import './ID.css';

const InvoiceBidding = () => {
  const {InvoicesContract}  = useContext(InvoiceContext)
  const [error, setError] = useState('');
  const [invoiceId, setInvoiceId] = useState('');
  const [bidAmount, setBidAmount] = useState('');
  const [bidder, setBidder] = useState('');
  // const [bidamount,setBidamount] = useState('');

  const handleBidOnInvoice = async() => {
    // Perform input validation here if needed
    try{
    await InvoicesContract.bidOnInvoice(invoiceId, bidAmount);
    await InvoicesContract.on('InvoiceBidding',(invoiceid, bidder, bidAmount)=>{
      console.log(invoiceid)
      console.log(bidder)
      console.log(bidAmount)
      setInvoiceId(invoiceid.toString());
      setBidAmount(bidAmount.toString());
      setBidder(bidder.toString());
     
    })
    setInvoiceId('');
    setBidAmount('');
  } catch (error) {
    console.error('Error closing invoice auction:', error);
    if (error.message.includes('cannot estimate gas; transaction may fail or may require manual gas limit')) {
      const gasLimitError = '' +
        error.message.match(/reason="(.*?)"/)[1].replace('execution reverted: ', ''); // Extract the reason from the error message
      setError(gasLimitError);
    } else {
      setError(error.message);
    }
  }
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
      {error && <p style={{ color: 'red' }}>{error}</p>}
        {
          invoiceId!=='' && bidAmount !=='' && bidder !==''&& (
            <div>
            <p>Invoice Id : {invoiceId}  with highest bid amount : {bidAmount}</p>
            <p>bidder : {bidder}</p>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default InvoiceBidding;
