import React from 'react';
import { Link } from 'react-router-dom'; // 1. We import Link here!
import './Header.css';

const Header = () => {
  return (
    <header className="site-header">
      {/* Dark Logo & Search Area */}
      <div className="header-top">
        <div className="header-top-content">
          <div className="logo-container">
            {/* 2. We wrap the logo in a Link so clicking it always takes you Home */}
            <Link to="/" style={{ textDecoration: 'none' }}>
              <h1 className="logo-text">Study Marrow Careers</h1>
            </Link>
          </div>
          
          <div className="search-container">
            <input type="text" placeholder="Search this website..." className="search-input" />
            <button className="search-btn">Search</button>
          </div>
        </div>
      </div>

      {/* Main Blue Navigation Bar */}
      <div className="main-nav">
        <div className="nav-container">
          {/* 3. We change all <a href="..."> to <Link to="..."> */}
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/admission">Admission</Link>
          <Link to="/admit-card">Admit Card</Link>
          <Link to="/imp-links">Imp Links</Link>
          <Link to="/private-job">Private Job</Link>
          <Link to="/result">Result</Link>
          <Link to="/scholarship">Scholarship</Link>
          <Link to="/submit-job">Submit Job</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;