// Home.jsx (updated)
import React, { useState } from 'react';
import './home.css';

const Home = () => {
  const [activeTab, setActiveTab] = useState('students');

  return (
    <div className="home-container">
      {/* Tab Navigation */}
      <div className="tab-container">
        <button 
          className={`tab-button ${activeTab === 'students' ? 'active' : ''}`}
          onClick={() => setActiveTab('students')}
        >
          For Students
        </button>
        <button 
          className={`tab-button ${activeTab === 'companies' ? 'active' : ''}`}
          onClick={() => setActiveTab('companies')}
        >
          For Companies
        </button>
      </div>

      {/* Why Students Love Us Section */}
      <section className={`section students-section ${activeTab === 'students' ? 'active' : ''}`}>
        <div className="container">
          <div className="section-title">
            <h2>Why students love us</h2>
          </div>
          <div className="features-list">
            <div className="feature-item">
              <div className="feature-content">
                <h3>Direct access to verified companies</h3>
                <p>Students connect directly with government-approved and top companies, without middlemen.</p>
              </div>
            </div>
            
            <div className="feature-item">
              <div className="feature-content">
                <h3>Transparency in opportunities</h3>
                <p>Internship details like stipend, duration, and eligibility are clearly mentioned upfront.</p>
              </div>
            </div>
            
            <div className="feature-item">
              <div className="feature-content">
                <h3>One-click applications</h3>
                <p>Students can apply to multiple internships using a single profile, saving time.</p>
              </div>
            </div>
            
            <div className="feature-item">
              <div className="feature-content">
                <h3>Skill-based matching</h3>
                <p>Smart recommendation engine suggests internships aligned with the student’s skills and interests.</p>
              </div>
            </div>
             <div className="feature-item">
              <div className="feature-content">
                <h3>To-Do & Application Tracker</h3>
                <p>Students can maintain a task list and track their internship application progress in one place.</p>
              </div>
            </div>
             <div className="feature-item">
              <div className="feature-content">
                <h3>AI-powered Chatbot Assistance</h3>
                <p>A 24×7 chatbot guides students with application steps, FAQs, and resolving queries instantly.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Companies Love Us Section */}
      <section className={`section companies-section ${activeTab === 'companies' ? 'active' : ''}`}>
        <div className="container">
          <div className="section-title">
            <h2>Why companies love us</h2>
          </div>
          <div className="features-list">
            <div className="feature-item">
              <div className="feature-content">
                <h3>Access to top talent</h3>
                <p>Connect with motivated, skilled students from top institutions.</p>
              </div>
            </div>
            
            <div className="feature-item">
              <div className="feature-content">
                <h3>Powerful recruiting tools</h3>
                <p>Post internships, manage applications, and schedule interviews easily.</p>
              </div>
            </div>
            
            <div className="feature-item">
              <div className="feature-content">
                <h3>Applicant tracking system</h3>
                <p>Manage your recruitment pipeline efficiently.</p>
              </div>
            </div>
            
            <div className="feature-item">
              <div className="feature-content">
                <h3>AI-powered matching</h3>
                <p>Our system helps you find the most suitable candidates.</p>
              </div>
            </div>
                 
            <div className="feature-item">
              <div className="feature-content">
                <h3>Verified & government-backed platform</h3>
                <p>Builds trust as internships posted are monitored and verified by government guidelines.</p>
              </div>
            </div>
             <div className="feature-item">
              <div className="feature-content">
                <h3>Cost-effective hiring</h3>
                <p>No third-party recruitment charges — companies save costs by hiring directly.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
