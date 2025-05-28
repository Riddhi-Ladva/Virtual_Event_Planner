import React, { useState, useEffect } from "react";

const stars = [1, 2, 3, 4, 5];

const ExitIntentReviewPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

 useEffect(() => {
  const userId = localStorage.getItem("user");
  if (!userId) return; // no popup if not logged in

  if (sessionStorage.getItem("exitIntentShown")) return;

  const handleMouseMove = (e) => {
    if (e.clientY < 50) {
      setShowPopup(true);
      sessionStorage.setItem("exitIntentShown", "true");
      window.removeEventListener("mousemove", handleMouseMove);
    }
  };

  window.addEventListener("mousemove", handleMouseMove);

  return () => {
    window.removeEventListener("mousemove", handleMouseMove);
  };
}, []);


  if (!showPopup) return null;

  const handleClose = () => {
    setShowPopup(false);
  };

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

  // Get userId from localStorage
 const user = JSON.parse(localStorage.getItem('user'));
 const userId = user?.id || user?._id;

  try {
    const response = await fetch('http://localhost:5000/api/review', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        rating,
        comment,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert('Thanks for your review!');
      setShowPopup(false);
      setRating(0);
      setHoverRating(0);
      setComment('');
    } else {
      alert(data.message || 'Failed to submit review');
    }
  } catch (error) {
    alert('Network error. Please try again later.');
  }
};

  return (
    <div style={overlay}>
      <div style={popup}>
        <button onClick={handleClose} style={closeBtn} aria-label="Close popup">
          &times;
        </button>
        <h2 style={{ marginBottom: "1rem" }}>Before you go, please leave a review!</h2>

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
  zIndex: 10000,
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

export default ExitIntentReviewPopup;
