import React, { useState } from 'react'
import './Login.css'

const LoginPopUp = ({ setShowLogin, setUser, setShowProfile }) => {
  const [currentState, setCurrentState] = useState("Login");
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = currentState === "Login" ? "http://localhost:5000/login" : "http://localhost:5000/signup";
    
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (data.success) {
        // alert(data.message);
        // Store token in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user_id', data.user_id);
        localStorage.setItem('username', data.username);
        
        // Set user data regardless of login or signup
        if (typeof setUser === 'function') {
          setUser({
            id: data.user_id,
            username: data.username,
            token: data.token
          });
        }
        
        setShowLogin(false);
        
        // If signing up, show profile page for completing profile
        if (currentState === "Sign Up" && typeof setShowProfile === 'function') {
          setShowProfile(true);
        }
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <div className='login-popup-overlay'>
      <div className='login-popup'>
        <form className="login-popup-container" onSubmit={handleSubmit}>
          <div className="login-popup-title">
            <h2>{currentState}</h2>
            <div className='cross-btn' onClick={()=>setShowLogin(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </div>
          </div>
          
          <div className="login-popup-input">
            {currentState === "Sign Up" && (
              <div className="input-group">
                <input 
                  type="text" 
                  placeholder='Your Username' 
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  autoComplete="username"
                  required 
                />
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
            )}
            
            <div className="input-group">
              <input 
                type="email" 
                placeholder='Your Email' 
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required 
              />
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </svg>
            </div>
            
            <div className="input-group">
              <input 
                type="password" 
                placeholder='Your Password' 
                name="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete={currentState === "Login" ? "current-password" : "new-password"}
                required 
              />
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
          </div>
          
          <button type="submit" className="login-submit-btn">
            {currentState === "Sign Up" ? "Create Account" : "Login"}
          </button>
          
          <div className="login-popup-condition">
            <label className="checkbox-container">
              <input type="checkbox" required />
              <span className="checkmark" required></span>
              <p>By continuing, I agree to the terms of use & privacy policy</p>
            </label>
          </div>
          
          <div className="login-popup-switch">
            {currentState === "Login"
              ? <p>Create a new Account? <span onClick={() => setCurrentState("Sign Up")}>Click Here</span></p>
              : <p>Already have an Account? <span onClick={() => setCurrentState("Login")}>Login Here</span></p>
            }
          </div>
        </form>
      </div>
    </div>
  )
}

// Add default props to prevent errors
LoginPopUp.defaultProps = {
  setShowLogin: () => console.warn('setShowLogin function not provided'),
  setUser: () => console.warn('setUser function not provided'),
  setShowProfile: () => console.warn('setShowProfile function not provided')
};

export default LoginPopUp