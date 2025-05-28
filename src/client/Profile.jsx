import React, { useState, useEffect } from 'react';
import './Profile.css';
import Footer from './Footer';
import Navbar from './Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import bg1 from '../assets/1.jpg';
import bg2 from '../assets/2.jpg';
import bg3 from '../assets/3.jpg';

export default function ProfileCard() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  const images = [bg1, bg2, bg3];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        navigate("/Login");
        return;
      }

      const userData = JSON.parse(storedUser);
      if (!userData._id) {
        navigate("/Login");
        return;
      }

      try {
        const res = await axios.get(`http://localhost:5000/api/users/${userData._id}`);
        if (res.data) {
          setUser(res.data);
          setFormData({
            name: res.data.name,
            email: res.data.email,
            phone: res.data.phone,
            password: res.data.password // Be cautious with displaying/editing plain passwords
          });
          setLoading(false);
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
        navigate("/Login");
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/Login");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`http://localhost:5000/api/users/${user._id}`, formData);
      setUser(res.data);
      setEditMode(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Failed to update user:", err);
      alert("Update failed.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="profile-page" style={{ backgroundImage: `url(${images[currentImage]})` }}>
        <div className="profile-card">
          {!editMode && <button className="edit-btn" onClick={() => setEditMode(true)}>✏️</button>}

          {editMode ? (
            // Edit mode form
            <div className="edit-form">
                {/* Potentially add image upload here if needed */}
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
                {/* IMPORTANT: For password, it's safer to have two fields (new password, confirm new password)
                     and send only if they are filled, rather than prepopulating with a hash or previous value.
                     For now, keeping it as is based on your original code, but be aware of security implications. */}
                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="New Password (leave blank to keep current)" />
                <div className="edit-buttons" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '15px', // Keep consistent with previous margin-top
                    width: '100%' // Ensure it takes full width
                }}>
                    <button className="save-btn" onClick={handleUpdate}>💾 Save</button>
                    <button className="cancel-btn" onClick={() => setEditMode(false)}>❌ Cancel</button>
                </div>
            </div>
          ) : (
            // Display mode
            <div className="profile-header-content"> {/* New container for image and details */}
              <img src={user.profileImage || "../assets/Profile.jpg"} alt="Profile" className="profile-image" />
              <div className="profile-details-text"> {/* New container for text details */}
                <h2 className="profile-name">{user.name}</h2>
                <p className="profile-email"><strong>Email:</strong> {user.email}</p>
                <p className="profile-phone"><strong>Phone:</strong> {user.phone}</p>
                <p className="profile-password"><strong>Password:</strong> ********</p>
              </div>
            </div>
          )}

          <div className="past-events">
            <h4>Past Events Booked</h4>
            <ul>
              {user.pastEvents && user.pastEvents.length > 0 ? (
                user.pastEvents.map((event, index) => (
                  <li key={index}>
                    <strong>Event:</strong> {event.eventType}<br />
                    <strong>Date:</strong> {new Date(event.eventDate).toLocaleDateString()}<br />
                    <strong>Venue:</strong> {event.venue?.name}<br />
                    <strong>Total Cost:</strong> ₹{event.finalCost}
                  </li>
                ))
              ) : (
                <li>No events booked</li>
              )}
            </ul>
          </div>

          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </div>
      <Footer />
    </>
  );
}