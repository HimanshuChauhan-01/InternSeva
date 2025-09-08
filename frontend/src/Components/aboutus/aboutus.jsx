import React from 'react';
import './aboutus.css';
import Contact from '../contact/Contact';
const AboutUs = () => {
  return (
    <div className="about-us-container">
      {/* Background */}
      <div className="bg"></div>

      {/* Main content */}
      <div className="band">
        <div className="container">
          <h1 className="page-title">About InternSeva</h1>
          
          <div className="intro-section">
            <p>At Interseva, we believe that the right opportunity can change someone's life—and no one should miss out on it. Whether you're a student looking for hands-on experience, a fresher chasing your first big break, or an employer searching for passionate talent, 
            we're here to connect the dots between learning and earning.</p>
            <p>Our journey started with a simple thought: why should access to internships, jobs, and skill-building be complicated? Too often, talented people get left behind—not because they lack ability,
            but because they lack the right exposure or guidance. That's the gap Interseva was built to close.</p>
          </div>

          <div className="cards">
            {/* top row: 3 cards */}
            <div className="row row-top">
              <article className="card">
                <div className="card-head">
                  <span className="icon"><span className="material-icons">👁</span></span>
                  <h3>Our Vision</h3>
                </div>
                <p>A world where talent meets opportunity seamlessly—empowering people to grow faster, dream bigger, and achieve more</p>
              </article>

              <article className="card">
                <div className="card-head">
                  <span className="icon"><span className="material-icons">🚩</span></span>
                  <h3>Our Mission</h3>
                </div>
                <p>To make internships and jobs easier to find and more accessible.</p>
                <p>To help young talent build the skills they need to thrive in the real world.</p>
                <p>To support organizations in discovering the right people who can truly add value.</p>
              </article>

              <article className="card">
                <div className="card-head">
                  <span className="icon"><span className="material-icons">📩</span></span>
                  <h3>Our Values</h3>
                </div>
                <p>Integrity, Excellence, Innovation, Inclusivity, and Empowerment form the foundation of everything we do at EmploymentExpress.</p>
              </article>
            </div>

            {/* bottom row: 3 cards */}
            <div className="row row-bottom">
              <article className="card">
                <div className="card-head">
                  <span className="icon"><span className="material-icons">🏫</span></span>
                  <h3>For Students</h3>
                </div>
                <p>Explore internships, part-time opportunities, entry-level jobs, and skill-building resources to gain confidence and practical experience.</p>
              </article>

              <article className="card">
                <div className="card-head">
                  <span className="icon"><span className="material-icons">💼</span></span>
                  <h3>For Companies</h3>
                </div>
                <p> Discover motivated candidates who are ready to learn, grow, and bring fresh energy to your team.</p>
              </article>
              <article className="card">
                <div className="card-head">
                  <span className="icon"><span className="material-icons">👥</span></span>
                  <h3>For Everyone</h3>
                </div>
                <p> We make career building simple, transparent, and accessible—because opportunities should never come with barriers.</p>
              </article>
            </div>
          </div>

          <div className="services-section">
            <h2>Our Special Features</h2>
            <div className="services-list">
              <div className="service-item">
                <span className="emoji-icon">🤖</span>
                <div className="service-text">
                  <h4>Internship Recommendation Engine</h4>
                  <p>Matches students with the most relevant internships based on their skills, interests</p>
                </div>
              </div>
              <div className="service-item">
                <span className="emoji-icon">🗺️</span>
                <div className="service-text">
                  <h4>Interactive Internship Map</h4>
                  <p>Helps candidates explore opportunities state/city-wise, ensuring location-based accessibility</p>
                </div>
              </div>
              <div className="service-item">
                <span className="emoji-icon">🗣️</span>
                <div className="service-text">
                  <h4>Past Intern Feedback System</h4>
                  <p>Builds confidence by showcasing real experiences & reviews from previous interns</p>
                </div>
              </div>
              <div className="service-item">
                <span className="emoji-icon">📋</span>
                <div className="service-text">
                  <h4>Skill Gap To-Do List</h4>
                  <p>Detects missing skills for chosen internships and suggests personalized upskilling paths</p>
                </div>
              </div>  
            </div>
            <button className="contact-btn">
                 <a href="/contact" className="nav-link-contact nav-link">
                    Contact Us
                 </a>
               
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
