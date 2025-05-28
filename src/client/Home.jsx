import React, { useState, useEffect } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';


// Import images from the src/assets folder
import image1 from '../assets/2.jpg'; // Adjust the path based on your folder structure
import image2 from '../assets/1.jpg';
import image3 from '../assets/3.jpg';
import Navbar from './Navbar';
import Footer from './Footer';

const Home = () => {
  const images = [image1, image2, image3]; // Store the imported images in the array

  const [currentImage, setCurrentImage] = useState(0);
   const [reviews, setReviews] = useState([]);
   const [visibleCount, setVisibleCount] = useState(3);
     const [startIndex, setStartIndex] = useState(0);



  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevIndex) => (prevIndex + 1) % images.length); // Cycle through the images
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  const reviewsPerPage = 3;

  useEffect(() => {
    fetch('http://localhost:5000/api/review')
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(r => r.comment && r.comment.length > 50);
        setReviews(filtered);
      })
      .catch(err => console.error('Error fetching reviews:', err));
  }, []);

  const handleNext = () => {
    if (startIndex + reviewsPerPage < reviews.length) {
      setStartIndex(startIndex + reviewsPerPage);
    }
  };

  const handlePrev = () => {
    if (startIndex - reviewsPerPage >= 0) {
      setStartIndex(startIndex - reviewsPerPage);
    }
  };



  const loadMore = () => {
    setVisibleCount(prev => prev + 3);
  };

  return (
    <>
< Navbar/>

    <div className="home-page">
      {/* Header */}
      {/* <header>
        <h2>EventPlanner</h2>
        <nav>
          <a href="#">Home</a>
        </nav>
        <div className="auth-buttons">

   
<div className="auth-buttons">
  <Link to="/login">
    <button className="login">Login</button>
  </Link>
  <Link to="/Signup">
    <button className="signup">Sign Up</button>
  </Link>
</div>

        </div>
      </header> */}

      {/* Hero Section with Dynamic Background */}
      <section className="hero" style={{ backgroundImage: `url(${images[currentImage]})` }}>
        <div className="hero-content">
          <h1>Plan Your Perfect Virtual Event</h1>
          <p>
            From intimate gatherings to large-scale conferences, we handle the
            details so you can focus on your guests.
          </p>

<Link to="/CityFinder">
  <button>Plan Your Event</button>
</Link>        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose EventPlanner?</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <div className="icon">📅</div>
            <h3>Seamless Scheduling</h3>
            <p>Effortlessly manage dates, times, and invites with our intuitive calendar tools.</p>
          </div>
          <div className="feature-card">
            <div className="icon">📍</div>
            <h3>Virtual Venue Discovery</h3>
            <p>Explore a curated list of virtual venues tailored to your event size and style.</p>
          </div>
          <div className="feature-card">
            <div className="icon">✨</div>
            <h3>Theme Customization</h3>
            <p>Select from stunning decoration themes or create your own unique virtual environment.</p>
          </div>
          <div className="feature-card">
            <div className="icon">🍽️</div>
            <h3>Custom Menu Planning</h3>
            <p>Build the perfect virtual dining experience with diverse menu options, including dietary filters.</p>
          </div>
          <div className="feature-card">
            <div className="icon">📸</div>
            <h3>Professional Services</h3>
            <p>Easily book photographers, DJs, and other essential services for your virtual event.</p>
          </div>
          <div className="feature-card">
            <div className="icon">✔️</div>
            <h3>Review & Confirm</h3>
            <p>Get a clear summary of all your selections before finalizing your virtual event plan.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
      <h2>What Our Clients Say</h2>
      <div className="cinema-controls">
        <button onClick={handlePrev} disabled={startIndex === 0} className="arrow-btn">←</button>
        <div className="testimonial-cinema">
          {reviews.slice(startIndex, startIndex + reviewsPerPage).map((review, index) => (
            <div key={index} className="testimonial-card fade-in">
              {review.comment}
            </div>
          ))}
        </div>
        <button onClick={handleNext} disabled={startIndex + reviewsPerPage >= reviews.length} className="arrow-btn">→</button>
      </div>
    </section>

      {/* Footer */}
     {/* // <footer>
        <div>© 2025 EventPlanner · <a href="#">Privacy Policy</a> · <a href="#">Terms of Service</a></div>
      </footer> */}
    </div>
    <Footer/>
    </>);
};

export default Home;
