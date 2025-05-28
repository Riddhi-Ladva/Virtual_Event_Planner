import React, { useState, useEffect } from 'react';

const PaymentPage = ({ closeModal, totalCost, onPaymentSuccess }) => {
  const [paymentStatus, setPaymentStatus] = useState(null);

  const handlePayment = () => {
    setPaymentStatus('processing');

    setTimeout(() => {
      setPaymentStatus('success');

      // Example payment info you might want to send to backend
      const paymentDetails = {
        transactionId: 'TXN' + Date.now(),
        amountPaid: totalCost,
        paymentMethod: 'Fake Payment',
        paidAt: new Date().toISOString(),
      };

      if (onPaymentSuccess) {
        onPaymentSuccess(paymentDetails);
      }
    }, 2000);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Payment</h2>
      <p>Amount to pay: ₹{totalCost}</p>

      {paymentStatus === 'success' ? (
        <p style={{ color: 'green' }}>Payment Successful!</p>
      ) : paymentStatus === 'processing' ? (
        <p>Processing Payment...</p>
      ) : (
        <button onClick={handlePayment} style={{ padding: '10px 20px' }}>
          Pay Now
        </button>
      )}

      
    </div>
  );
};

export default PaymentPage;
