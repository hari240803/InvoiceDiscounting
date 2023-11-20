import React, { useContext, useState } from 'react';
import { toNumber } from 'web3-utils';
import { InvoiceContext } from '../context/InvoiceContext';
import './ID.css';

const InvoiceCreation = () => {
  const {InvoicesContract}  = useContext(InvoiceContext);
  const [error, setError] = useState('');
  const [buyer, setBuyer] = useState('');
  const [invoiceAmount, setInvoiceAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [auctionEndTime, setAuctionEndTime] = useState('');
 // const [supplier, setSupplier] = useState('')
  const [InvoiceId,setInvoiceId] = useState('');

  function convertDateTimeLocalToUnix(datetimeLocalValue) {
    const datetime = new Date(datetimeLocalValue);
    const unixTimestamp = Math.floor(datetime.getTime() / 1000);
    return unixTimestamp;
  }

  const duedate = convertDateTimeLocalToUnix(dueDate);
  const auctionTime = convertDateTimeLocalToUnix(auctionEndTime);
  const handleCreateInvoice = async() => {
    try{
    // Perform input validation here if needed
    await InvoicesContract.createInvoice(buyer, invoiceAmount, duedate, auctionTime);
    await InvoicesContract.on('InvoiceCreated',(invoiceId, supplier, invoiceAmount, dueDate)=>{
      console.log(invoiceId)
      console.log(supplier)
      console.log(invoiceAmount)
      console.log(dueDate)
      setInvoiceId(invoiceId.toString());
      //setSupplier(supplier.tostring());
      setBuyer(buyer.toString());
      setDueDate(duedate.toString());
      
    });
  // Clear the input fields after creating the invoice
  setBuyer('');
  setInvoiceAmount('');
  setDueDate('');
  setAuctionEndTime('');
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

// const unixTimestamp1 = dueDate.toNumber();
// // const unixTimestamp2 = .toNumber();
// const jsDate1 = new Date(unixTimestamp1 * 1000);
// const jsDate2 = new Date(unixTimestamp2 * 1000);


// const convertUnixTimestampToDate = (timestamp) => {
//   const unixTimestamp = toNumber(timestamp, 10);
//   const date = new Date(unixTimestamp * 1000);

//   const dateString = date.toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//   });

//   const timeString = date.toLocaleTimeString('en-US', {
//     hour: 'numeric',
//     minute: 'numeric',
//   });

//   return `${dateString} at ${timeString}`;
// };

  return (
    <div>
      <h2>Create Invoice</h2>
      <label>Buyer Address: </label>
      <input type="text" value={buyer} onChange={(e) => setBuyer(e.target.value)} /><br />
      <label>Invoice Amount: </label>
      <input type="text" value={invoiceAmount} onChange={(e) => setInvoiceAmount(e.target.value)} /><br />
      <label>Due Date: </label>
      <input type="datetime-local" value={dueDate} onChange={(e) => setDueDate(e.target.value)} /><br />
      <label>Auction End Time: </label>
      <input type="datetime-local" value={auctionEndTime} onChange={(e) => setAuctionEndTime(e.target.value)} /><br />
      <button onClick={handleCreateInvoice}>Create Invoice</button>
      <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
        {InvoiceId!=='' &&
          <p>Invoice Id : {InvoiceId}</p>
        }
        {/* {supplier!=null &&
         <p>supplier: {supplier}</p>
        } */}
        {buyer!=='' &&
         <p>Buyer: {buyer}</p>
        }
        {dueDate !== '' && 
          <p>Due Date: {dueDate}</p>
        }
      </div>
    </div>
  
  );
};

export default InvoiceCreation;
