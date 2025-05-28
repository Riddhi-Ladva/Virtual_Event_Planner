import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './Reviewplan.css';
import PaymentPage from './Payment';
import Navbar from './Navbar';
import Footer from './Footer';

const ReviewPlan = () => {
  const [data, setData] = useState({});
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const navigate = useNavigate();

  const handleview = () => {
    navigate('/view');
  };

  useEffect(() => {
    const city = JSON.parse(localStorage.getItem('selectedCity'));
    const venue = JSON.parse(localStorage.getItem('selectedVenue'));
    const menuData = JSON.parse(localStorage.getItem('selectedMenu'));
    const decoration = JSON.parse(localStorage.getItem('selectedDecoration'));
    const eventType = localStorage.getItem('eventType');
    const eventDate = localStorage.getItem('eventDate');
    const selectedService = JSON.parse(localStorage.getItem('selectedService'));
const serviceCost = selectedService?.price || 0;

    const personCount = parseInt(localStorage.getItem('personCount'), 10) || menuData?.persons;

    const menuTotal = menuData?.totalCost || 0;
const finalCost = (venue?.price || 0) + (decoration?.price || 0) + menuTotal + serviceCost;

    setData({
      city,
      venue,
      menu: menuData?.menu || menuData,
      service: selectedService,
      decoration,
      eventType,
      eventDate,
      personCount,
      menuTotal,
      finalCost,
    });
  }, []);

  const handlePaymentSuccess = async (paymentDetails) => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const userId = user?.id || user?._id;

      if (!userId) {
        alert('User not logged in!');
        setLoading(false);
        return;
      }

      const bookingPayload = {
        userId,
        city: data.city,
        venue: data.venue,
        menu: data.menu,
          service: data.service,

        decoration: data.decoration,
        eventType: data.eventType,
        eventDate: data.eventDate,
        personCount: data.personCount,
        menuTotal: data.menuTotal,
        finalCost: data.finalCost,
        paymentDetails,
      };

      const response = await fetch('http://localhost:5000/api/history/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingPayload),
      });

      const contentType = response.headers.get('content-type');

      if (!response.ok) {
        let errorMsg = 'Failed to save booking';
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          errorMsg = errorData.message || errorMsg;
        } else {
          const text = await response.text();
          console.error('Non-JSON error response:', text);
          errorMsg = text;
        }
        throw new Error(errorMsg);
      }

      if (contentType && contentType.includes('application/json')) {
        await response.json();
        alert('Payment successful and booking saved!');
        setShowPaymentModal(false);
      } else {
        const text = await response.text();
        console.warn('Response not JSON:', text);
        alert('Payment successful and booking saved! (Non-JSON response)');
        setShowPaymentModal(false);
      }
    } catch (error) {
      alert('Error saving booking: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // New: Submit review to server
  const submitReview = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?.id || user?._id;

    if (!userId) {
      alert('User not logged in!');
      return;
    }
    if (comment.trim() === '') {
      alert('Please enter a comment');
      return;
    }
    if (rating < 1 || rating > 5) {
      alert('Rating must be between 1 and 5');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: userId, rating, comment }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit review');
      }

      alert('Review submitted successfully!');
      setShowReviewModal(false);
      setRating(5);
      setComment('');
    } catch (error) {
      alert('Error submitting review: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="review-page">
        <main>
          <h2>Review Your Event Plan</h2>

<div className="review-labels">
  {data.eventType && (
    <div className="form-group">
      <label className="form-label">Event Type:</label>
      <span className="form-value">{data.eventType}</span>
    </div>
  )}

  {data.eventDate && (
    <div className="form-group">
      <label className="form-label">Date & Time:</label>
      <span className="form-value">{new Date(data.eventDate).toLocaleString()}</span>
    </div>
  )}
</div>
          <div className="grid">
            {data.city && (
              <div className="card">
                <img src={data.city.image} alt="City" />
                <div className="card-text">
                  <h3>City</h3>
                  <p>{data.city.name}</p>
                </div>
              </div>
            )}
           


            {data.venue && (
              <div className="card">
                <img src={data.venue.img} alt="Venue" />
                <div className="card-text">
                  <h3>Venue</h3>
                  <p>{data.venue.name}</p>
                  <p>Capacity: {data.venue.capacity} guests</p>
                  <p>Price: ₹{data.venue.price}</p>
                </div>
              </div>
            )}
            {data.menu && (
  <div className="card">
    <img src="http://localhost:5000/uploads/allmenu.jpg" alt="Menu" />
    <div className="card-text">
      <h3>Menu</h3>
      <ul>
        {data.menu.map((item, index) => (
          <li key={index}>
            {item.name} - ₹{item.pricePerPerson} per person
          </li>
        ))}
      </ul>
      <p>No. of Persons: {data.personCount}</p>
      <p>Total Menu Cost: ₹{data.menuTotal}</p>
    </div>
  </div>
)}

            {data.decoration && (
              <div className="card">
                <img src={data.decoration.image} alt="Decoration" />
                <div className="card-text">
                  <h3>Decoration</h3>
                  <p>{data.decoration.name || data.decoration.theme}</p>
                  <p>Price: ₹{data.decoration.price}</p>
                </div>
              </div>
            )}
          </div>

{/* {data.service && (
  <div className="card">
    <img src={data.service.image} alt="Service" />
    <div className="card-text">
      <h3>Service</h3>
      <p>{data.service.name}</p>
      <p>Price: ₹{data.service.price}</p>
    </div>
  </div>)
} */}





          <div className="total-box">
            <h3>Final Estimated Cost</h3>
            <p>₹{data.finalCost}</p>
          </div>

          <button
            className="filter-btn confirm-btn"
            onClick={() => setShowPaymentModal(true)}
            disabled={loading}
          >
            Confirm &amp; Proceed
          </button>

          <button className="filter-btn confirm-btn" onClick={handleview}>
            Virtual View Of Event
          </button>

          {/* <button
            className="filter-btn confirm-btn"
            style={{ marginTop: '10px', backgroundColor: '#4caf50' }}
            onClick={() => setShowReviewModal(true)}
            disabled={loading}
          >
            Leave a Review
          </button> */}

          {showPaymentModal && (
            <div className="payment-modal">
              <div className="payment-modal-content">
                <PaymentPage
                  closeModal={() => setShowPaymentModal(false)}
                  totalCost={data.finalCost}
                  onPaymentSuccess={handlePaymentSuccess}
                />
                <button onClick={() => setShowPaymentModal(false)} className="close-btn" aria-label="Close payment modal">
  &times;
</button>

              </div>
            </div>
          )}

          
        </main>
        
      </div>
      <Footer />
    </>
  );
};

export default ReviewPlan; 