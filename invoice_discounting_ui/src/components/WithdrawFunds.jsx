import React from 'react';

const WithdrawFunds = ({ onWithdrawFunds }) => {
  const handleWithdrawFunds = () => {
    // No input required for withdrawing funds
    onWithdrawFunds();
  };

  return (
    <div>
      <h2>Withdraw Funds</h2>
      <button onClick={handleWithdrawFunds}>Withdraw Funds</button>
    </div>
  );
};

export default WithdrawFunds;
