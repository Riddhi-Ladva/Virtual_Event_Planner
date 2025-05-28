import React, { useEffect, useState } from 'react';
import './Login.css';
import axios from 'axios';

import bg1 from '../assets/1.jpg';
import bg2 from '../assets/2.jpg';
import bg3 from '../assets/3.jpg';
import Navbar from './Navbar';
import Footer from './Footer';

const backgroundImages = [bg1, bg2, bg3];

const Login = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % backgroundImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
  
      // Assuming the response contains user information and a message
      setMessage(res.data.message);
      console.log("Logged in user:", res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user)); // Save user to localStorage
      console.log("User data stored in localStorage", localStorage.getItem("user")); // Debugging log
      window.location.href = "/Profile"; // ✅ Redirect to home after login
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };
  
  

  return (
    <>
      <Navbar />
      <div
        className="login-page"
        style={{
          backgroundImage: `url(${backgroundImages[currentImage]})`,
        }}
      >
        <div className="overlay" />
        <div className="login-container">
          <h2>Login to EventPlanner</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
            {message && <p>{message}</p>}
          </form>
          <p>Don't have an account? <a href="/signup">Sign up here</a></p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
