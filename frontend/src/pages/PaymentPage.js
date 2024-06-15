import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../PaymentPage.css';

function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId, centerID, slotDate } = location.state;

  const [paymentMethod, setPaymentMethod] = useState('');
  const [creditCardDetails, setCreditCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const handlePayment = async () => {
    try {
      // Assume payment is successful

      // Proceed to book the slot
      const response = await axios.post('http://localhost:3000/api/users/training-centers/booking/' + userId, {
        centerID,
        slotDate,
      });

      alert(response.data.message);
      navigate('/home');
    } catch (error) {
      console.error('Error booking slot:', error);
      alert('Error booking slot: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleCreditCardSubmit = (e) => {
    e.preventDefault();
    handlePayment();
  };

  return (
    <div className="payment-page">
      <h2>Select Payment Method</h2>
      <div className="payment-options">
        <button className="payment-button" onClick={() => setPaymentMethod('Credit Card')}>Credit Card</button>
        <button className="payment-button" onClick={() => handlePayment('PayPal')}>PayPal</button>
        <button className="payment-button" onClick={() => handlePayment('Bank Transfer')}>Bank Transfer</button>
      </div>

      {paymentMethod === 'Credit Card' && (
        <form className="credit-card-form" onSubmit={handleCreditCardSubmit}>
          <h3>Enter Credit Card Details</h3>
          <div className="form-group">
            <label>Card Number</label>
            <input
              type="text"
              value={creditCardDetails.cardNumber}
              onChange={(e) => setCreditCardDetails({ ...creditCardDetails, cardNumber: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Expiry Date</label>
            <input
              type="text"
              value={creditCardDetails.expiryDate}
              onChange={(e) => setCreditCardDetails({ ...creditCardDetails, expiryDate: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>CVV</label>
            <input
              type="text"
              value={creditCardDetails.cvv}
              onChange={(e) => setCreditCardDetails({ ...creditCardDetails, cvv: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="payment-button">Submit Payment</button>
        </form>
      )}
    </div>
  );
}

export default PaymentPage;
