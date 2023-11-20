import React, { useContext,useState } from 'react';
import { InvoiceContext } from '../context/InvoiceContext';
import './ID.css';

const WithdrawFunds = () => {
  const {InvoicesContract}  = useContext(InvoiceContext)
  const [error, setError] = useState('');
  const handleWithdrawFunds = async () => {
    try {
      setError('');

      // Call the withdraw function on the smart contract
      const tx = await InvoicesContract.withdraw();

      // Wait for the transaction to be mined
      await tx.wait();

      // Update the user interface or perform any other necessary actions

    } catch (error) {
      console.error('Error withdrawing funds:', error);
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
      <h2>Withdraw Funds</h2>
      <button onClick={handleWithdrawFunds}>Withdraw Funds</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default WithdrawFunds;
