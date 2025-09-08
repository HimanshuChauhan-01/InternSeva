import React, { useState } from "react";
import "./recommend.css";

// Sample data
const opportunities = [
    {
    title: "Java Developer Intern",
    company: "Google",
    views: 100,
    location: "Bangalore",
    type: "internship",
    duration: "6 Months",
    salary: "₹40,000/month",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"
  },
  {
    title: "PMI Internship Scheme",
    company: "Ministry of Corporate Affairs",
    views: 100,
    location: "Pan India",
    type: "internship",
    duration: "3 Months",
    salary: "₹10,000/month",
    logo: "https://play-lh.googleusercontent.com/-_cPuQoGbEU7-u1piogY012U1sek1v_hXldsu5kpDeak67dIJ-nCTseLV1IJVkGu1A=w600-h300-pc0xffffff-pd"
  },
  {
    title: "Microsoft",
    company: "Backend Intern",
    views: 43,
    location: "Hyderbad",
    type: "internship",
    duration: "3 Months",
    salary: "₹35,000/month",
    logo: "https://cdn-icons-png.flaticon.com/512/732/732221.png"
  },
  {
    title: "AI research Intern",
    company: "IIT Delhi",
    type: "internship",
    location : "Delhi",
    duration: "4 Month",
    salary: "₹50,000/month",
    logo: "https://upload.wikimedia.org/wikipedia/sa/6/66/IIT_Delhi_logo.png"
  },
  {
     title: "Web development",
    company: "Infosys",
    type: "internship",
    location : "pune",
    duration: "3 Month",
    salary: "₹20,000/month",
    logo: "https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/logos/infosys-8nrfgjwoh4xzdqe08eaize.png/infosys-9za0o1s5y9vf3h5zdthern.png?_a=DATAg1AAZAA0"
  },
  {
    title: "HDFC Life's Aspire 2.0",
    company: "HDFC Life",
    mode: "Online Free",
    type: "challenge",
    duration: "Self-paced",
    salary: "₹30,000/month",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXgiz41maa34mpQoVYhRyZ8wk8XOMZfHvIrA&s"
  },
  {
    title: "Research Intern",
    company: "Deloitte",
    applied: 2582,
    daysLeft: 6,
    type: "challenge",
    duration: "6 Days Left",
    salary: "₹90,000/month",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9rTfOmHehYoGznTL0bQ_6gXj9OkUbo6cnXw&s"
  },
  {
    title: "Marketing",
    company: "Amul",
    mode: "Online Free",
    views: 20634,
    hoursLeft: 9,
    type: "challenge",
    duration: "9 Hours Left",
    salary: "1,000/month",
    logo: "https://cdn.iconscout.com/icon/free/png-256/free-amul-icon-svg-png-download-2249167.png"
  },
   {
    title: "Mahindra",
    company: "Finance",
    mode: "Online Free",
    views: 20634,
    hoursLeft: 9,
    type: "challenge",
    duration: "9 Hours Left",
    salary: "10,000/month",
    logo: "https://i.pinimg.com/736x/55/06/41/550641417b2581c308939400bd7a5467.jpg"
  }
];

const Recommendation = () => {
  const [selectedSkill, setSelectedSkill] = useState("");
  const [recommendedJobs, setRecommendedJobs] = useState([]);

  // Skill → Job mapping
  const skillsToJobs = {
    "Digital Marketing": ["Marketing Intern", "SEO Intern", "Social Media Intern"],
    "Finance": ["Finance Intern", "Accounting Intern", "Investment Intern"],
    "Web Development": ["Frontend Intern", "Backend Intern", "Full Stack Intern"],
    "Mobile App Development": ["Android Intern", "iOS Intern", "React Native Intern"],
    "Content Writing": ["Copywriting Intern", "Blogging Intern", "Technical Writing Intern"],
    "Data Science": ["Data Analyst Intern", "ML Intern", "AI Intern"],
  };

  const handleSkillSelect = (skill) => {
    setSelectedSkill(skill);
    setRecommendedJobs(skillsToJobs[skill] || []);
  };

  return (
    <div className="recommend-container">
      {/* Header */}
      <div className="recommend-header">
        <h1>Find Internships Based on Your Skills</h1>
        <p>Select your skill to see recommended internship categories</p>
      </div>

      {/* Skill Selection Buttons */}
      <div className="skills-container">
        {Object.keys(skillsToJobs).map((skill) => (
          <button
            key={skill}
            className={`skill-btn ${selectedSkill === skill ? "active" : ""}`}
            onClick={() => handleSkillSelect(skill)}
          >
            {skill}
          </button>
        ))}
      </div>

      {/* Recommended Internships */}
      <div className="recommend-results">
        {selectedSkill && (
          <>
            <h2>
              Recommended Internships for:{" "}
              <span className="highlight">{selectedSkill}</span>
            </h2>
            <div className="card-container">
              {recommendedJobs.map((job, index) => (
                <div key={index} className="job-card">
                  <h3>{job}</h3>
                  <p>
                    Gain hands-on experience in <b>{selectedSkill}</b> with this
                    internship opportunity.
                  </p>
                  <button className="apply-btn">Apply Now</button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Explore Opportunities Section */}
      <div className="extra-section">
        <h2 className="extra-title">Explore More Opportunities</h2>
        <p className = "extra-para">Find your Internships in InterSeva</p>
        <div className="opportunity-grid">
          {opportunities.map((op, index) => (
            <div key={index} className="intern-card">
              <div className="card-header">
                <img src={op.logo} alt={op.company} className="company-logo" />
                <div>
                  <h3 className="role">Role: {op.title}</h3>
                  <p className="company">Company: {op.company}</p>
                </div>
              </div>
              <p className="details">
                <span className="emoji">⏳</span> Duration: {op.duration}
              </p>
              <p className="details">
                <span className="emoji">💰</span> Salary: {op.salary}
              </p>
              <button className="apply-btn">View Details</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recommendation;
