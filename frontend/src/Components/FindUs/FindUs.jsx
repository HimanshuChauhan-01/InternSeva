import React, { useState } from 'react';
import './InternshipSearch.css';

const InternshipSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search functionality here
    console.log('Searching for:', searchTerm, 'in', location);
  };

  return (
    <div className="internship-search-container">
      <div className="hero-section">
        <h1>Your Dream Internship Is Just A Click Away</h1>
        <p>ACCE Internships help Indian students find internships they love and organizations find the best interns on a Pan India basis.</p>
      </div>
      
      <div className="search-card">
        <h2>Find Your Perfect Internship</h2>
        <form onSubmit={handleSearch} className="search-form">
          <div className="input-group">
            <div className="input-field">
              <label htmlFor="search">What are you looking for?</label>
              <input
                type="text"
                id="search"
                placeholder="Company Name or Internship Role (e.g., Engineer, Analyst)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="input-field">
              <label htmlFor="location">Where?</label>
              <input
                type="text"
                id="location"
                placeholder="City"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            
            <button type="submit" className="search-button">
              Find Internships
              <span className="icons">→</span>
            </button>
          </div>
        </form>
      </div>
      
      <div className="features-section">
        <div className="feature">
          <div className="feature-icon">🎯</div>
          <h3>Personalized Matches</h3>
          <p>Get recommendations based on your skills and interests</p>
        </div>
        
        <div className="feature">
          <div className="feature-icon">🌏</div>
          <h3>Pan India Reach</h3>
          <p>Opportunities from companies across India</p>
        </div>
        
        <div className="feature">
          <div className="feature-icon">⚡</div>
          <h3>Quick Application</h3>
          <p>Apply to multiple internships with just one profile</p>
        </div>
      </div>
    </div>
  );
};

export default InternshipSearch;