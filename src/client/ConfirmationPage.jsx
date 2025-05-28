import React from 'react';
import { useNavigate } from 'react-router-dom';

const ConfirmationPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: 50 }}>
      <h2>Payment Completed</h2>
      <p>Thank you for your purchase!</p>
      <button onClick={() => navigate('/')} style={{ padding: '10px 20px', cursor: 'pointer' }}>
        Back to Home
      </button>
    </div>
  );
};

export default ConfirmationPage;
