import React, { useState, useEffect } from 'react';
import './Otherservice.css';
import Navbar from './Navbar';
import Footer from './Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OtherServices = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/otherservices');
        setServices(res.data);
      } catch (err) {
        console.error('Error fetching services:', err);
      }
    };
    fetchServices();
  }, []);

  const handleNext = () => {
    navigate('/ReviewPlan');
  };

  const handlePrevious = () => {
    navigate('/MultiCuisineMenu');
  };

  return (
    <>
      <Navbar />
      <div className="other-services">
        <main>
          <h2>Explore Other Services</h2>

          <div className="grid">
            {services.length > 0 ? (
              services.map((service, index) => (
                <div
                  key={index}
                  className="card"
                  style={{
                    border: '1px solid #ccc',
                    cursor: 'default'  // no pointer cursor
                  }}
                >
                  <img src={service.image} alt={service.name} />
                  <div className="card-text">
                    <h3>{service.name}</h3>
                    <p>{service.description}</p>
                    <p><strong>Price:</strong> ₹{service.price}</p>
                    <p style={{ fontStyle: 'italic', color: '#555', marginTop: '8px' }}>
                      Service will be provided if available. Payment to be made on the event day.
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>No services available.</p>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            <button onClick={handlePrevious}>Previous</button>
            <button onClick={handleNext}>Next</button>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default OtherServices;
