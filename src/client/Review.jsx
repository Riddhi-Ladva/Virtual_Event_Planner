import React, { useState } from "react";
import axios from 'axios';

const stars = [1, 2, 3, 4, 5];

const ReviewPopup = ({ visible, onClose }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      alert("Please select a star rating.");
      return;
    }

    if (!comment.trim()) {
      alert("Please enter your comment.");
      return;
    }

    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("User not logged in.");
      return;
    }

    const reviewData = {
      user: userId,
      rating,
      comment,
    };

    try {
      await axios.post('http://localhost:5000/api/feedback', reviewData);
      alert('Review submitted successfully!');
      setRating(0);
      setHoverRating(0);
      setComment("");
      onClose();
    } catch (err) {
      console.error(err);
      alert('Failed to submit review.');
    }
  };

  if (!visible) return null;

  return (
    <div style={overlay}>
      <div style={popup}>
        <button onClick={onClose} style={closeBtn} aria-label="Close popup">
          &times;
        </button>
        <h2 style={{ marginBottom: "1rem" }}>Leave a Review</h2>

        <form onSubmit={handleSubmit}>
          <div style={starContainer}>
            {stars.map((star) => (
              <Star
                key={star}
                starId={star}
                rating={rating}
                hoverRating={hoverRating}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
              />
            ))}
          </div>

          <textarea
            placeholder="Write your comments here..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            style={textareaStyle}
            maxLength={500}
          />

          <button type="submit" style={submitBtn}>
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

const Star = ({ starId, rating, hoverRating, onMouseEnter, onMouseLeave, onClick }) => {
  const fill = hoverRating >= starId || (!hoverRating && rating >= starId) ? "#FFD700" : "#ccc";

  return (
    <svg
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill={fill}
      stroke="#999"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ cursor: "pointer", marginRight: 5 }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
};

// Styles

const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0,0,0,0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const popup = {
  backgroundColor: "#fff",
  borderRadius: "8px",
  width: "90%",
  maxWidth: "400px",
  padding: "2rem",
  position: "relative",
  boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

const closeBtn = {
  position: "absolute",
  top: "10px",
  right: "15px",
  fontSize: "1.5rem",
  border: "none",
  background: "transparent",
  cursor: "pointer",
  color: "#555",
};

const starContainer = {
  display: "flex",
  marginBottom: "1rem",
};

const textareaStyle = {
  width: "100%",
  height: "100px",
  padding: "10px",
  fontSize: "1rem",
  borderRadius: "6px",
  border: "1px solid #ccc",
  resize: "vertical",
  marginBottom: "1.5rem",
  fontFamily: "inherit",
};

const submitBtn = {
  width: "100%",
  padding: "0.75rem",
  fontSize: "1rem",
  fontWeight: "600",
  color: "#fff",
  backgroundColor: "#007bff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  transition: "background-color 0.2s ease",
};

export default ReviewPopup;
