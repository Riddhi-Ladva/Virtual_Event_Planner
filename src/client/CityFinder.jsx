import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CityFinder.css';
import Navbar from './Navbar';
import Footer from './Footer';
import axios from 'axios';

const CityFinder = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  //localStorage.setItem('selectedCity', JSON.stringify(cityObject));


  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/cities');
        setCities(res.data);
      } catch (err) {
        console.error('Error fetching cities:', err);
      }
    };
    fetchCities();
  }, []);

  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setErrorMsg(''); // Clear error if any
    localStorage.setItem('selectedCity', JSON.stringify(city));
  };

  const handleNext = () => {
    if (!selectedCity) {
      setErrorMsg('Please select a city before proceeding.');
      return;
    }
    navigate('/SelectVenue', { state: { city: selectedCity } });
  };

  const handlePrevious = () => {
    navigate(-1); // go back to previous page
  };

  return (
    <>
      <Navbar />
      <div className="city-finder">
        <main>
          <h2>Find Your Event City</h2>
          <div className="controls">
            <input
              type="text"
              placeholder="Search for cities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid">
            {filteredCities.length > 0 ? (
              filteredCities.map((city, index) => (
               <div className={`card ${selectedCity?._id === city._id ? 'selected' : ''}`}
     key={index}
     onClick={() => handleCitySelect(city)}
     style={{ cursor: 'pointer', border: selectedCity?._id === city._id ? '2px solid blue' : '1px solid #ccc' }}
>
  <img src={city.image} alt={city.name} />
  <div className="card-text">
    <h3>{city.name}</h3>
    <p>{city.state}, {city.country}</p>
    <p style={{ marginTop: '8px', color: '#555' }}>{city.description}</p> {/* Add this line */}
  </div>
</div>

              ))
            ) : (
              <p>No cities match your search.</p>
            )}
          </div>

          {errorMsg && <p style={{ color: 'red', marginTop: '10px' }}>{errorMsg}</p>}

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

export default CityFinder;
