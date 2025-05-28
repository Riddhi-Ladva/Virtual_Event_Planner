import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './view.css';
import Footer from './Footer';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const ReviewPlanPage = () => {
  const [eventPlan, setEventPlan] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const city = JSON.parse(localStorage.getItem('selectedCity'));
    const venue = JSON.parse(localStorage.getItem('selectedVenue'));
    const menu = JSON.parse(localStorage.getItem('selectedMenu'));
    const decoration = JSON.parse(localStorage.getItem('selectedDecoration'));
    const eventType = localStorage.getItem('eventType');

    const plan = { city, venue, menu, decoration, eventType };
    setEventPlan(plan);

    const prompt = `A ${eventType} at ${venue?.name || venue} in ${city?.name || city} decorated with ${decoration?.theme || decoration?.name || decoration} theme and serving ${Array.isArray(menu?.menu) ? menu.menu.map(m => m.name).join(", ") : menu?.menu || menu}`;
    
    generateImage(prompt);
  }, []);

  const generateImage = async (prompt) => {
    setLoading(true);
    setError(null);
    setImageUrl(null);

    const formData = new FormData();
    formData.append("prompt", prompt);
    formData.append("output_format", "webp");

    try {
      const response = await axios.post(
        'https://api.stability.ai/v2beta/stable-image/generate/core',
        formData,
        {
          headers: {
            Authorization: 'Bearer Your_API_Key',
            Accept: 'image/*'
          },
          responseType: 'arraybuffer',
        }
      );

      if (response.status === 200) {
        const imageBlob = new Blob([response.data], { type: 'image/webp' });
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setImageUrl(imageObjectURL);
      } else {
        setError(`Generation failed with status ${response.status}`);
      }
    } catch (err) {
      setError("Error: " + err.message);
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="review-container">
        <h1 className="page-title">Review Your Event Plan</h1>

        {eventPlan ? (
          <div className="review-card">
            <div className="field-row">
              <span className="field-label">City:</span>
              <span className="field-value">{eventPlan.city?.name}</span>
            </div>
            <div className="field-row">
              <span className="field-label">Venue:</span>
              <span className="field-value">{eventPlan.venue?.name}</span>
            </div>
            <div className="field-row">
              <span className="field-label">Decoration:</span>
              <span className="field-value">{eventPlan.decoration?.theme || eventPlan.decoration?.name}</span>
            </div>
            <div className="field-row">
              <span className="field-label">Menu:</span>
              <span className="field-value">
                {Array.isArray(eventPlan.menu?.menu)
                  ? eventPlan.menu.menu.map(m => m.name).join(", ")
                  : eventPlan.menu?.menu}
              </span>
            </div>
            <div className="field-row">
              <span className="field-label">Event Type:</span>
              <span className="field-value">{eventPlan.eventType}</span>
            </div>
          </div>
        ) : (
          <p className="loading-text">Loading event data...</p>
        )}

        <h1 className="page-title mt-10">Virtual Preview</h1>

        <div className="image-preview-wrapper">
          {loading ? (
            <div className="loading-spinner" />
          ) : error ? (
            <p className="error-text">{error}</p>
          ) : imageUrl ? (
            <img
              src={imageUrl}
              alt="Generated Preview"
              className="event-image"
            />
          ) : (
            <p className="no-image-text">No image generated.</p>
          )}
        </div>

        <div className="button-group">
          <button className="btn" onClick={() => navigate(-1)}>Previous</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ReviewPlanPage;
