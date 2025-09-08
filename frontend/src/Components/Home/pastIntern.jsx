// PastIntern.jsx
import React, { useState } from 'react';
import './pastIntern.css';

const PastIntern = () => {
  const [activeBranch, setActiveBranch] = useState('all');

  // Sample data for past interns
  const interns = [
    {
      id: 1,
      name: "Anjali Desai",
      role: "UI/UX Design Intern",
      branch: "Design",
      quote: "Tiny taught us well. They provided us with PDFs and presentations during internship sessions and helped with resolving our doubts. The structured approach made learning design principles much easier.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "Full Stack Developer",
      branch: "Web Development",
      quote: "The hands-on experience I gained at InternSeva was invaluable. Working on real projects with a supportive team helped me grow my technical skills and confidence as a developer.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 3,
      name: "Neha Patel",
      role: "Cloud Computing Intern",
      branch: "Research",
      quote: "The best company I've ever seen & experienced. They explain everything so patiently with compassion & kindness. I'm always thankful to this company for the opportunities they've provided.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 4,
      name: "Rahul Mehta",
      role: "Digital Marketing Intern",
      branch: "Marketing",
      quote: "My marketing internship gave me practical experience in SEO, social media campaigns, and analytics. The mentorship I received helped me understand how to create effective marketing strategies.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 5,
      name: "Sneha Joshi",
      role: "Financial Analyst Intern",
      branch: "Finance",
      quote: "As a finance intern, I got to work on real financial models and analysis. The experience gave me insights into corporate finance that I couldn't have learned in the classroom.",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 6,
      name: "Amit Kumar",
      role: "Research Assistant",
      branch: "Research",
      quote: "My research internship allowed me to dive deep into data analysis and contribute to meaningful projects. The collaborative environment fostered both personal and professional growth.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
  ];

  // Filter interns based on selected branch
  const filteredInterns = activeBranch === 'all' 
    ? interns 
    : interns.filter(intern => intern.branch === activeBranch);

  return (
    <div className="past-intern-container">
      <div className="past-intern-header">
        <h2>What Our Interns Say</h2>
        <p>Hear from our past interns about their experiences at InternSeva</p>
      </div>

      {/* Branch Filter */}
      <div className="branch-filter">
        <button 
          className={activeBranch === 'all' ? 'active' : ''}
          onClick={() => setActiveBranch('all')}
        >
          All Branches
        </button>
        <button 
          className={activeBranch === 'Marketing' ? 'active' : ''}
          onClick={() => setActiveBranch('Marketing')}
        >
          Marketing
        </button>
        <button 
          className={activeBranch === 'Finance' ? 'active' : ''}
          onClick={() => setActiveBranch('Finance')}
        >
          Finance
        </button>
        <button 
          className={activeBranch === 'Web Development' ? 'active' : ''}
          onClick={() => setActiveBranch('Web Development')}
        >
          Web Development
        </button>
        <button 
          className={activeBranch === 'Research' ? 'active' : ''}
          onClick={() => setActiveBranch('Research')}
        >
          Research
        </button>
        <button 
          className={activeBranch === 'Design' ? 'active' : ''}
          onClick={() => setActiveBranch('Design')}
        >
          Design
        </button>
      </div>

      {/* Intern Testimonials */}
      <div className="intern-testimonials">
        {filteredInterns.map(intern => (
          <div key={intern.id} className="testimonial-card">
            <div className="testimonial-content">
              <p>"{intern.quote}"</p>
            </div>
            <div className="intern-info">
              <div className="intern-image">
                <img src={intern.image} alt={intern.name} />
              </div>
              <div className="intern-details">
                <h4>{intern.name}</h4>
                <p>{intern.role}</p>
                <span className="branch-tag">{intern.branch}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PastIntern;
