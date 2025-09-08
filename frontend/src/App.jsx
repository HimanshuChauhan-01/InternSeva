import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import LoginPopUp from './Components/login/Login';
import Home from './pages/Home';
import Profile from './pages/Profile';
import EditProfile from './Components/editprofile/EditProfile';
import Feedback from './Components/feedback/feedback';
import AboutUs from './Components/aboutus/aboutus';
import Contact from './Components/contact/Contact';
import Interseva from './Components/Home/home';
import PastIntern from './Components/Home/pastIntern';
import Recommendation from './Components/recommend/recommend';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);

  // Check if user is logged in on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user_id');
    const username = localStorage.getItem('username');
    
    if (token && userId) {
      setUser({
        id: userId,
        username: username || 'User',
        token: token
      });
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('username');
    setUser(null);
  };

  return (
    <div className="App">
      <Navbar 
        setShowLogin={setShowLogin} 
        user={user} 
        handleLogout={handleLogout}
      />
      
      <Routes>
        <Route path='/' element={<Home user={user} />} />
        <Route 
          path="/profile" 
          element={
            <Profile 
              user={user} 
              setShowLogin={setShowLogin}
            />
          } 
        />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/home" element={<Interseva />} />
        <Route path="/pastIntern" element={<PastIntern />} />
        <Route path="/recommendation" element={< Recommendation/>} />
        <Route 
          path='/edit-profile' 
          element={
            user ? 
            <EditProfile user={user} setUser={setUser} /> : 
            <div className="auth-required">
              <div className="auth-message">
                <h2>Authentication Required</h2>
                <p>Please log in to edit your profile</p>
                <button onClick={() => setShowLogin(true)} className="login-redirect-btn">
                  Login Now
                </button>
              </div>
            </div>
          }
        />
        <Route path="/feedback" element={<Feedback />} />
      </Routes>
      
      {showLogin && (
        <LoginPopUp 
          setShowLogin={setShowLogin} 
          setUser={setUser}
        />
      )}
    </div>
  );
}

export default App;
