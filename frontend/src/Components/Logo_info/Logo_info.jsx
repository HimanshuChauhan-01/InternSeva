import React, { useState, useEffect } from 'react';
import './logo_info.css';
// import Profile_SVG from '../assets/Nav_illustration_1_SVG.svg';  // <-- fixed path

const Logo_Info = ({ user }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="logo-info-container">
      <div className={`content-wrapper ${isVisible ? 'visible' : ''}`}>
        {/* Logo Section */}
        <div className="logo-section">
          <div className="logo-wrapper">
            <img 
              src='src\assets\Nav_illustration_1_SVG.svg' 
              alt="Profile Logo" 
              className="logo-svg"
            />
          </div>
        </div>

        {/* Info Section */}
        <div className="info-section">
          <div className="greeting">
            <h1 className="greeting-text">
              Hi {user ? user.username : 'Guest'},
              <span className="waving-hand">👋</span>
            </h1>
          </div>

          <div className="tagline">
            <h2 className="tagline-text">
              Your gateway to <span className="highlight">opportunities</span>, 
              <span className="highlight"> growth</span> and 
              <span className="highlight"> learning</span>
            </h2>
          </div>

          {!user && (
            <div className="guest-cta">
              <p>Join us today to unlock your potential!</p>
              <button className="cta-button">Get Started</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Logo_Info;
