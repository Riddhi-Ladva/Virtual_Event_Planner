import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>
        © 2025 <span className="brand">RoyalOccasions</span> &middot; 
        <a href="/privacy" className="footer-link"> Privacy Policy </a> &middot; 
        <a href="/terms" className="footer-link"> Terms of Service </a>
      </p>
    </footer>
  );
};

export default Footer;
