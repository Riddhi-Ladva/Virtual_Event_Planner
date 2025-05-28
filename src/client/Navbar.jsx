import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link } from 'react-router-dom';
import logo from "../assets/logor.png";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user); // true if user exists
  }, []);

  return (
    <nav className="navbar">
      <div className="nav-left">
        <img src={logo} alt="EventPlanner Logo" className="logo" />
      </div>

      <div className="nav-right">
        <Link to="/" className="nav-link active">Home</Link>
        {!isLoggedIn && (
          <Link to="/Login" className="nav-link active">Login</Link>
        )}
        {isLoggedIn && (
          <Link to="/Profile" className="nav-link active">Profile</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
