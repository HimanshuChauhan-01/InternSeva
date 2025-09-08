import React, { useState } from 'react';
import './navbar.css';
import defaultProfile from '/src/assets/profile-user.png';
import indiaLogo from '/src/assets/india-digi.svg';
import internsevaLogo from '/src/assets/InternSeva_Logo_2_SVG copy.svg';

const Navbar = ({ user, setUser, setShowLogin }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('username');
    setUser(null);
    setIsProfileOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleProfileClick = (e) => {
    if (!user) {
      e.preventDefault();
      setShowLogin(true);
    }
  };

  const handleFeedbackClick = (e) => {
    // Add any feedback-specific logic here
    console.log("Feedback clicked");
  };

  return (
    <div className="navbar-container">
      {/* --------- TOP SECTION ---------- */}
      <div className="nav-top">
        <div className="nav-top-left">
          <p>Government of India</p>
          <p>Ministry of Information Technology</p>
          <img src={indiaLogo} alt="india" />
        </div>

        <div className="nav-top-right">
          {user ? (
            <div className="user-menu">
              <span className="welcome-text">Welcome, {user.username}</span>
              <div className="profile-container">
                <button className="profile-icon-btn" onClick={toggleProfile}>
                  <img
                    src={user?.profileImage || defaultProfile}
                    alt="Profile"
                    className="nav-profile-img"
                  />
                </button>

                {isProfileOpen && (
                  <div className="profile-dropdown">
                    <a href="/profile" className="dropdown-item">
                      <i className="fas fa-user"></i>
                      <span>My Profile</span>
                    </a>
                    <a
                      href="#"
                      className="dropdown-item"
                      onClick={(e) => {
                        e.preventDefault();
                        handleLogout();
                      }}
                    >
                      <i className="fas fa-sign-out-alt"></i>
                      <span>Logout</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <button className="login-btn" onClick={() => setShowLogin(true)}>
              <span>LOGIN</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                viewBox="0 -960 960 960"
                width="20"
                fill="currentColor"
              >
                <path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* --------- MAIN NAVBAR ---------- */}
      <div className="nav-main">
        <div className="nav-container">
          <div className="nav-logo">
            <span>
              <img
                className="inter-logo"
                src={internsevaLogo}
                alt="InternSeva Logo"
              />
            </span>
          </div>

          <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <div className="nav-links">
              <a href="/" className="nav-link">Home</a>
              <a href="/about" className="nav-link">About Us</a>
              <a href="/internships" className="nav-link">Internships</a>
              <a href="/feedback" className="nav-link" onClick={handleFeedbackClick}>Feedback</a>
              <a href="/contact" className="nav-link">Contact Us</a>
              <a 
                href={user ? "/profile" : "#"} 
                className="nav-link profile-link"
                onClick={handleProfileClick}
              >
                <span>Profile</span>
              </a>
            </div>
          </div>

          <div className="hamburger" onClick={toggleMenu}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
