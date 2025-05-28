import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './VenueStyles.css';
import Navbar from './Navbar';
import Footer from './Footer';
import axios from 'axios';

const eventTypes = ['Wedding', 'Birthday', 'Corporate', 'Anniversary', 'Engagement'];

export default function DecorationThemes() {
  const navigate = useNavigate();
  const [eventType, setEventType] = useState('');
  const [eventDate, setEventDate] = useState('');

  const [decorations, setDecorations] = useState([]);
  const [selectedDecoration, setSelectedDecoration] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDecorations = async () => {
      try {
        const res = await axios.get('/api/decorations');
        setDecorations(res.data);
      } catch (err) {
        console.error('Failed to fetch decorations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDecorations();

    // Load saved data from localStorage if exists
    const savedEventType = localStorage.getItem('eventType');
    const savedEventDate = localStorage.getItem('eventDate');
    const savedDecoration = localStorage.getItem('selectedDecoration');


    if (savedEventType) setEventType(savedEventType);
    if (savedEventDate) setEventDate(savedEventDate);
    if (savedDecoration) setSelectedDecoration(JSON.parse(savedDecoration));

  }, []);

  function getTomorrowDateTime() {
  const now = new Date();
  now.setDate(now.getDate() + 1); // Add 1 day for tomorrow
  now.setSeconds(0, 0); // Clear seconds and milliseconds
  return now.toISOString().slice(0, 16); // "YYYY-MM-DDTHH:mm"
}


  const handleNext = () => {
    if (!eventType || !eventDate || !selectedDecoration) return;

    localStorage.setItem('eventType', eventType);
    localStorage.setItem('eventDate', eventDate);

    localStorage.setItem('selectedDecoration', JSON.stringify(selectedDecoration));

    navigate('/MultiCuisineMenu');
  };

  const handlePrevious = () => {
    navigate('/venue-selection');
  };

  return loading ? (
    <p>Loading decorations...</p>
  ) : (
    <>
      <Navbar />
      <div className="city-finder">
        <main>
          <h2>Select Your Event Type</h2>
          <select
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            className="filter-dropdown"
          >
            <option value="">-- Select Event Type --</option>
            {eventTypes.map((type, i) => (
              <option key={i} value={type}>
                {type}
              </option>
            ))}
          </select>

          <h2 style={{ marginTop: '30px' }}>Select Event Date & Time</h2>
         <input
  type="datetime-local"
  value={eventDate}
  onChange={(e) => setEventDate(e.target.value)}
  min={getTomorrowDateTime()}
  className="filter-dropdown"
  style={{ padding: '8px', fontSize: '16px', marginTop: '8px' }}
/>


          <h2 style={{ marginTop: '30px' }}>Select Decoration Theme</h2>
          <div className="grid">
            {decorations.map((theme) => (
              <div
                key={theme._id}
                className={`card ${selectedDecoration?._id === theme._id ? 'selected' : ''}`}
                onClick={() => setSelectedDecoration(theme)}
                style={{ cursor: 'pointer' }}
              >
                <img src={theme.image || '/default-theme.jpg'} alt={theme.name} />
                <div className="card-text">
                  <h3>{theme.name}</h3>
                  <p>₹{theme.price?.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
  
            <button onClick={handlePrevious}  style={{ marginRight: '10px' }}>
              Previous
            </button>
            <button
              onClick={handleNext}
              
              disabled={!eventType || !eventDate || !selectedDecoration}
            >
              Next
            </button>
            
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
