import React, { useState, useEffect } from 'react';
import './feedback.css';

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    category: '',
    subject: '',
    message: ''
  });
  const [captcha, setCaptcha] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');

  // Generate Captcha
  const generateCaptcha = () => {
    let chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let newCaptcha = "";
    for (let i = 0; i < 5; i++) {
      newCaptcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(newCaptcha);
  };

  // Initialize captcha on component mount
  useEffect(() => {
    generateCaptcha();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (captcha !== captchaInput) {
      alert("Captcha does not match. Try again!");
      generateCaptcha();
      setCaptchaInput('');
      return;
    }
    
    alert("Feedback submitted successfully!");
    // Reset form
    setFormData({
      name: '',
      email: '',
      mobile: '',
      category: '',
      subject: '',
      message: ''
    });
    setCaptchaInput('');
    generateCaptcha();
  };

  return (
    <div className="form-container">
      <h2>Your Feedback is important for us!</h2>
      <form id="feedbackForm" onSubmit={handleSubmit}>
        
        <label>Your Name *</label>
        <input 
          type="text" 
          name="name" 
          maxLength="100" 
          required 
          value={formData.name}
          onChange={handleInputChange}
        />
        
        <label>Your Email *</label>
        <input 
          type="email" 
          name="email" 
          maxLength="150" 
          required 
          value={formData.email}
          onChange={handleInputChange}
        />
        
        <label>Mobile No *</label>
        <input 
          type="tel" 
          name="mobile" 
          maxLength="10" 
          pattern="[0-9]{10}" 
          required 
          value={formData.mobile}
          onChange={handleInputChange}
        />
        
        <label>Category *</label>
        <div className="category-options">
          <label><input type="radio" name="category" value="OBC" required checked={formData.category === 'OBC'} onChange={handleInputChange} /> OBC</label>
          <label><input type="radio" name="category" value="SC" checked={formData.category === 'SC'} onChange={handleInputChange} /> SC</label>
          <label><input type="radio" name="category" value="ST" checked={formData.category === 'ST'} onChange={handleInputChange} /> ST</label>
          <label><input type="radio" name="category" value="Minority" checked={formData.category === 'Minority'} onChange={handleInputChange} /> Minority</label>
          <label><input type="radio" name="category" value="General" checked={formData.category === 'General'} onChange={handleInputChange} /> General</label>
        </div>
        
        <label>Subject *</label>
        <select 
          name="subject" 
          required 
          value={formData.subject}
          onChange={handleInputChange}
        >
          <option value="">-- Select Subject --</option>
          <option value="Admission">Admission</option>
          <option value="Exams">Exams</option>
          <option value="Fees">Fees</option>
          <option value="Technical Issue">Technical Issue</option>
          <option value="Other">Other</option>
        </select>
        
        <label>Your Message *</label>
        <textarea 
          name="message" 
          maxLength="500" 
          required 
          value={formData.message}
          onChange={handleInputChange}
        ></textarea>
        
        <label>Enter Captcha *</label>
        <div className="captcha-box">
          <div className="captcha">{captcha}</div>
          <input 
            type="text" 
            value={captchaInput}
            onChange={(e) => setCaptchaInput(e.target.value)}
            placeholder="Enter Code" 
            required 
          />
          <button type="button" onClick={generateCaptcha}>↻</button>
        </div>
        
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Feedback;
