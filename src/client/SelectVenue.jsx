import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import './VenueStyles.css';

export default function VenuePage() {
  const location = useLocation();
  const navigate = useNavigate();

  const city = location.state?.city; 
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);

  // Track selected venue
  const [selectedVenue, setSelectedVenue] = useState(() => {
    // Try to get from localStorage if page reload
    const saved = localStorage.getItem('selectedVenue');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (!city?._id) {
      navigate('/CityFinder');
      return;
    }

    const fetchVenues = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/venues/${city._id}`);
        setVenues(res.data);
      } catch (err) {
        console.error('Error fetching venues:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, [city, navigate]);

  // When user selects a venue
  const handleSelectVenue = (venue) => {
    setSelectedVenue(venue);
    localStorage.setItem('selectedVenue', JSON.stringify(venue));
  };

  // Navigate back to city selection
  const handlePrevious = () => {
    navigate('/CityFinder');
  };

  // Navigate to review plan only if venue selected
  const handleNext = () => {
    if (!selectedVenue) return;
    navigate('/SelectDecoration', { state: { city, venue: selectedVenue } });
  };

  if (loading) return <p>Loading venues...</p>;

  return (
    <>
      <Navbar />
      <div className="city-finder">
        <main>
          <h2>Venues in {city?.name}</h2>
          <div className="grid">
            {venues.length > 0 ? (
              venues.map((venue) => (
                <div
                  key={venue._id}
                  className={`card ${selectedVenue?._id === venue._id ? 'selected' : ''}`}
                  onClick={() => handleSelectVenue(venue)}
                  style={{ cursor: 'pointer' }}
                >
                  <img src={venue.img || '/default-venue.jpg'} alt={venue.name} />
                  <div className="card-text">
                    <h3>{venue.name}</h3>
                    <p>Capacity: {venue.capacity} guests</p>
                    <p>Price: ₹{venue.price.toLocaleString()}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No venues available for this city.</p>
            )}
          </div>

          <div className="navigation-buttons" style={{ marginTop: '20px' }}>
            <button onClick={handlePrevious}>Previous</button>
            <button onClick={handleNext} disabled={!selectedVenue} style={{ marginLeft: '10px' }}>
              Next
            </button>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
