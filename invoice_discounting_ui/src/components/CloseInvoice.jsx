import React, { useContext,useState } from 'react';
import { InvoiceContext } from '../context/InvoiceContext';

const CloseInvoice = () => {
  const [invoiceId,setInvoiceId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const {InvoicesContract}  = useContext(InvoiceContext)

  const handleCloseInvoice = async () => {
    try {
      setError('');
      setLoading(true); 
  
      // Call the closeInvoiceAuction function on the smart contract
      const tx = await InvoicesContract.closeInvoiceAuction(invoiceId,{ gasLimit: 2000000 });
  
      // Wait for the transaction to be mined
      await tx.wait();
  
      // Listen for the InvoiceClosed event
      InvoicesContract.once('InvoiceClosed', (invoiceId, highestBidder, supplierAmount) => {
        console.log('Invoice closed successfully');
        console.log('Invoice ID:', invoiceId);
        console.log('Highest Bidder:', highestBidder);
        console.log('Supplier Amount:', supplierAmount);
      });
  
      setInvoiceId('');
    } catch (error) {
      console.error('Error closing invoice auction:', error);
      if (error.message.includes('cannot estimate gas; transaction may fail or may require manual gas limit')) {
        const gasLimitError = '' +
          error.message.match(/reason="(.*?)"/)[1].replace('execution reverted: ', ''); // Extract the reason from the error message
        setError(gasLimitError);
      } else {
        setError(error.message);
      }
     
        setLoading(false); // Set loading back to false after transaction processing
     
    }
  };
  

  return (
    <div>
      <h2>Close Invoice Auction</h2>
      <label>Invoice ID: </label>
      <input type="text" value={invoiceId} onChange={(e) => setInvoiceId(e.target.value)} /><br />
      <button onClick={handleCloseInvoice}>Close Invoice Auction</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default CloseInvoice;
