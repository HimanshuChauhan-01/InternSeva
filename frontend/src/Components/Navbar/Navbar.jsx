import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import './Navbar.css';
// Import images (adjust paths as needed)
import indiaLogo from '../../assets/india-digi.svg';
import internsevaLogo from '../../assets/InternSeva_Logo_2_SVG.svg';
import defaultProfile from '../../assets/profile-user.png';

const Navbar = ({ user, setUser, setShowLogin }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('home');
  const profileRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
    setActiveMenu('profile');
  };

  const handleMenuClick = (menuItem) => {
    setActiveMenu(menuItem);
    setIsMenuOpen(false);
  };

  const handleFeedbackClick = (e) => {
    console.log("Feedback clicked");
    setActiveMenu('feedback');
    // Add navigation logic here if needed
  };

  return (
    <div className="navbar-container">
      {/* --------- TOP SECTION ---------- */}
      <div className="nav-top">
        <div className="nav-top-left">
          <img src={indiaLogo} alt="India Government Logo" />
          <p>Government of India</p>
          <p>Ministry of Information Technology</p>
        </div>

        <div className="nav-top-right">
          {user ? (
            <div className="user-menu" ref={profileRef}>
              <span className="welcome-text">Welcome, {user.username}</span>
              <div className="profile-container">
                <button 
                  className="profile-icon-btn" 
                  onClick={toggleProfile}
                  aria-expanded={isProfileOpen}
                  aria-label="User profile menu"
                >
                  <img
                    src={user.profileImage || defaultProfile}
                    alt="Profile"
                    className="nav-profile-img"
                    onError={(e) => {
                      e.target.src = defaultProfile;
                    }}
                  />
                </button>

                {isProfileOpen && (
                  <div className="profile-dropdown">
                    <Link 
                      to="/profile" 
                      className="dropdown-item"
                      onClick={() => handleMenuClick('profile')}
                    >
                      <i className="fas fa-user"></i>
                      <span>My Profile</span>
                    </Link>
                    <button
                      className="dropdown-item"
                      onClick={handleLogout}
                    >
                      <i className="fas fa-sign-out-alt"></i>
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <button 
              className="login-btn" 
              onClick={() => setShowLogin(true)}
              aria-label="Login"
            >
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
            <Link to="/">
              <img
                className="inter-logo"
                src={internsevaLogo}
                alt="InternSeva Logo"
              />
            </Link>
          </div>

          <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <div className="nav-links">
              <Link 
                to="/" 
                className={`nav-link ${activeMenu === "home" ? "active" : ""}`} 
                onClick={() => handleMenuClick('home')}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className={`nav-link ${activeMenu === "about" ? "active" : ""}`}
                onClick={() => setActiveMenu('about')}
              >
                About Us
              </Link>
              <Link 
                to="/recommendation" 
                className={`nav-link ${activeMenu === "recommendation" ? "active" : ""}`}
                onClick={() => handleMenuClick('recommendation')}
              >
                Recommendation
              </Link>
              <Link 
                to="/feedback" 
                className={`nav-link ${activeMenu === "feedback" ? "active" : ""}`}
                onClick={handleFeedbackClick}
              >
                Feedback
              </Link>
              <Link 
                to="/contact" 
                className={`nav-link ${activeMenu === "contact" ? "active" : ""}`}
                onClick={() => handleMenuClick('contact')}
              >
                Contact Us
              </Link>
              <Link 
                to={user ? "/profile" : "#"} 
                className={`nav-link profile-link ${activeMenu === "profile" ? "active" : ""}`}
                onClick={handleProfileClick}
              >
                <span>Profile</span>
              </Link>
            </div>
          </div>

          <button 
            className={`hamburger ${isMenuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;