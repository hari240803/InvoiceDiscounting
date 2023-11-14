import React, { useContext, useState } from 'react';
import { InvoiceContext } from '../context/InvoiceContext';

const InvoiceCreation = () => {
  const {InvoicesContract}  = useContext(InvoiceContext)
  const [buyer, setBuyer] = useState('');
  const [invoiceAmount, setInvoiceAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [auctionEndTime, setAuctionEndTime] = useState('');
 
  const [InvoiceId,setInvoiceId] = useState(null);

  const handleCreateInvoice = async() => {
    // Perform input validation here if needed
    await InvoicesContract.createInvoice(buyer, invoiceAmount, dueDate, auctionEndTime);
    await InvoicesContract.on('InvoiceCreated',(invoiceId, sender, invoiceAmount, dueDate)=>{
      console.log(invoiceId)
      console.log(sender)
      console.log(invoiceAmount)
      console.log(dueDate)
      setInvoiceId(invoiceId.toString());
      
    })
  // Clear the input fields after creating the invoice
  setBuyer('');
  setInvoiceAmount('');
  setDueDate('');
  setAuctionEndTime('');
};

  return (
    <div>
      <h2>Create Invoice</h2>
      <label>Buyer Address: </label>
      <input type="text" value={buyer} onChange={(e) => setBuyer(e.target.value)} /><br />
      <label>Invoice Amount: </label>
      <input type="text" value={invoiceAmount} onChange={(e) => setInvoiceAmount(e.target.value)} /><br />
      <label>Due Date: </label>
      <input type="text" value={dueDate} onChange={(e) => setDueDate(e.target.value)} /><br />
      <label>Auction End Time: </label>
      <input type="text" value={auctionEndTime} onChange={(e) => setAuctionEndTime(e.target.value)} /><br />
      <button onClick={handleCreateInvoice}>Create Invoice</button>
      <div>
        {InvoiceId!=null &&
          <p>Invoice Created with Id : {InvoiceId}</p>
        }
      </div>
    </div>
  );
};

export default InvoiceCreation;
