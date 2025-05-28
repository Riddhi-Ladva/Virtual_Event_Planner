import React, { useEffect, useState } from 'react';
import './Signup.css';
import bg1 from '../assets/1.jpg';
import bg2 from '../assets/2.jpg';
import bg3 from '../assets/3.jpg';
import Navbar from './Navbar';
import Footer from './Footer';
import axios from 'axios';

const backgroundImages = [bg1, bg2, bg3];

const Signup = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'voter' // Default role
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % backgroundImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: formData.role
      });
      alert("Signup successful!");
      window.location.href = "/login";
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Signup failed. Try again later.");
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="signup-page"
        style={{ backgroundImage: `url(${backgroundImages[currentImage]})` }}
      >
        <div className="overlay" />
        <div className="signup-container">
          <h2>Sign Up for EventPlanner</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Full Name" required onChange={handleChange} />
            <input type="email" name="email" placeholder="Email Address" required onChange={handleChange} />
            <input type="tel" name="phone" placeholder="Phone Number" required onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" required onChange={handleChange} />
            <button type="submit">Create Account</button>
          </form>
          <p>Already have an account? <a href="/login">Login here</a></p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Signup;
